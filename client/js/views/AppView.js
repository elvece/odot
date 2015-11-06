//Views in Backbone don’t contain the HTML markup for your application; they contain the logic behind the presentation of the model’s data to the user.

//handles the creation of new todos and rendering of the initial todo list

var app = app || {};

//*** APP VIEW ***//
//top level piece of UI
app.AppView = Backbone.View.extend({

  //bind to the existing skeleton of the app already present in the html rather than generating a new element
  el: '#todoapp',

  //template for the line of statistics at the bottom of the app.
  statsTemplate: _.template($('#stats-template').html()),

  //delegated events for creating new items and clearing completed ones
  //action is assocaited with a function call, defined below
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  //on initialization, create new todoList bind to the relevant events on the todos in collection and listen for add or change events
  initialize: function() {
    //to access passed options in your view
    // this.options = options || {};
    this.collection = app.Todos;
    //when e fetch complates, reset event id fired, since the models are fetched asynchronously after the page is rendered
    this.collection.fetch({reset: true});

    //this.$() finds elements relative to this.$el
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(this.collection, 'add', this.addOne);

    this.listenTo(this.collection, 'reset change', function(){
        this.addAll();
        this.render();
      });

    this.listenTo(this.collection, 'change:completed', this.filterOne);

    this.listenTo(this.collection,'filter', this.filterAll);
  },

  //refresh stats
  //since method bound to all events on the Todos collection, stats in the footer are updated
  render: function() {

    var completed = this.collection.completed().length;
    var remaining = this.collection.remaining().length;

    if (this.collection.length) {
      //display depending on if todos exist
      this.$main.show();
      this.$footer.show();

      //populates footer by instantiating the statsTemplate with the number of completed and remaining todo items
      //also produces a set of filter links
      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
        .removeClass('selected')
        //todoFilter is set by router and applies the selected class to the link corresponding to the currently selected filter
        .filter('[href="#/' + (app.TodoFilter || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    //updated based on if there are remaining todos
    this.allCheckbox.checked = !remaining;
  },

  //add a single todo item to the list by creating a view for it and appending it to the list
  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },

  //add all items in the to do list collection
  //can use this to refer to the view because listenTo() implicitly set the callback’s context to the view when it created the binding
  addAll: function() {
    //clears to do list
    this.$('#todo-list').html('');
    //filter todo item list
    this.collection.each(this.addOne, this);
  },

  //callback on the todos collection for a change:completed event
  //listens for changes to the completed attribute for any model in the collection - the affected todo is passed to the callback which triggers a custom visible event on the model
  filterOne: function (todo) {
    todo.trigger('visible');
  },

  //callback to filter event
  //toggle which todo items are visible based on the filter currently selected (all, completed or remaining) by calling filterOne()
  filterAll: function () {
    this.collection.each(this.filterOne, this);
  },

  //generates  attributes for a new to do item
  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: this.collection.nextOrder(),
      completed: false
    };
  },

  //creates a new todo model and persists it in localStorage when a user hits enter inside the input field
  createOnEnter: function(event) {
    if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }
    //populates model, which returns an object of item attributes
    //this is view, not DOM since callback was bound using events hash
    this.collection.create(this.newAttributes());
    //resets input field
    this.$input.val('');
  },

  //removes the items in the todo list that have been marked as completed and destroys their models
  clearCompleted: function() {
    _.invoke(this.collection.completed(), 'destroy');
    return false;
  },

  //marks all of the items in the todo list as completed by clicking the toggle-all checkbox (true or false value)
  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    this.collection.each(function(todo) {
      todo.save({
        'completed': completed
      });
    });
  }
});



//   render: function(){

//     //items from model
//     var items = this.model.get('todo');
//     //loop through each of to do item
//     _.each(items, function(item){
//       //create a new instance of the ItemView, passing it a specific model item
//       var itemView = new TodoView({ model: item });
//       //itemView's DOM element is appended after it has been rendered
//       //return this from TodoView renders the ToDoView model
//       this.$el.append( itemView.render().el );
//     }, this);
//   }
// });



