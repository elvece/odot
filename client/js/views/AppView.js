//handles the creation of new todos and rendering of the initial todo list

var app = app || {};

//*** APP VIEW ***//

app.AppView = Backbone.View.extend({

  el: '#todoapp',

  statsTemplate: _.template($('#stats-template').html()),

  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  initialize: function() {

    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('.footer');
    this.$main = this.$('.main');

    this.collection = app.Todos;

    this.collection.fetch();

    this.listenTo(this.collection, 'add', this.addOne);

    this.listenTo(this.collection, 'reset change', function(){
        this.addAll();
        this.render();
      });

    this.listenTo(this.collection, 'change:completed', this.filterOne);

    this.listenTo(this.collection,'filter', this.filterAll);

    this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
  },

  //refresh stats - does not affect TodoView
  render: function() {

    var completed = this.collection.completed().length;
    var remaining = this.collection.remaining().length;

    if (this.collection.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
        .removeClass('selected')
        //TodoFilter is set by router
        .filter('[href="#/' + (app.TodoFilter || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  //add a single todo item to the list by creating a view for it
  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    $('.todo-list').append(view.render().el);
  },

  //add all items in the to do list collection
  addAll: function() {
    this.$('.todo-list').html('');
    this.collection.each(this.addOne, this);
  },

  //triggers on changes to the completed model attribute
  filterOne: function (todo) {
    todo.trigger('visible');
  },

  //toggle which todo items are visible
  filterAll: function () {
    this.collection.each(this.filterOne, this);
  },

  //generates attributes for a new to do item
  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: this.collection.nextOrder(),
      completed: false
    };
  },

  //creates a new todo model
  createOnEnter: function(event) {
    if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }
    this.collection.create(this.newAttributes());
    this.$input.val('');
  },

  clearCompleted: function() {
    _.invoke(this.collection.completed(), 'destroy');
    return false;
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    this.collection.each(function(todo) {
      todo.save({
        'completed': completed
      });
    });
  }
});
