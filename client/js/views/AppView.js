//Views in Backbone don’t contain the HTML markup for your application; they contain the logic behind the presentation of the model’s data to the user.

//handles the creation of new todos and rendering of the initial todo list

//*** APP VIEW ***//
//top level piece of UI
var AppView = Backbone.View.extend({

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

  //on initialization, bind to the relevant events on the todos in collection and listen for add or change events
  initialize: function(options) {
    //binds a function to an object so that anytime the function is called the value of this will be the object
    // this.model.bind('change', _.bind(this.render, this));
    // this.$el = $('#todo');
    //to access passed options in your view
    // this.options = options || {};

    //this.$() finds elements relative to this.$el
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(allToDos, 'add', this.addOne);
    this.listenTo(allToDos, 'reset', this.addAll);

    this.listenTo(allToDos, 'change:completed', this.filterOne);
    this.listenTo(allToDos,'filter', this.filterAll);
    //binds any event triggered on the todos collection to render method
    this.listenTo(allToDos, 'all', this.render);

    //fetches previously saved todos from local storage
    allToDos.fetch();
  },

  //refresh stats
  render: function() {
    var completed = allToDos.completed().length;
    var remaining = allToDos.remaining().length;

    if (allToDos.length) {
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
        .filter('[href="#/' + (TodoFilter || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    //updated based on if there are remaining todos
    this.allCheckbox.checked = !remaining;
  },

  //add a single todo item to the list by creating a view for it and appending it to the list
  addOne: function( todo ) {
    var view = new TodoView({ model: todo });
    $('#todo-list').append(view.render().el);
  },

  //add all items in the to do list collection
  //can use this to refer to the view because listenTo() implicitly set the callback’s context to the view when it created the binding
  addAll: function() {
    this.$('#todo-list').html('');
    //calling this correctly?
    allToDos.each(this.addOne, this);
  },

  //callback on the todos collection for a change:completed event
  //listens for changes to the completed attribute for any model in the collection - the affected todo is passed to the callback which triggers a custom visible event on the model
  filterOne: function (todo) {
    todo.trigger('visible');
  },

  //callback to filter event
  //toggle which todo items are visible based on the filter currently selected (all, completed or remaining) by calling filterOne()
  filterAll: function () {
    allToDos.each(this.filterOne, this);
  },

  //generates  attributes for a new to do item
  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: allToDos.nextOrder(),
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
    allToDos.create(this.newAttributes());
    //resets input field
    this.$input.val('');
  },

  //removes the items in the todo list that have been marked as completed and destroys their models
  clearCompleted: function() {
    _.invoke(allToDos.completed(), 'destroy');
    return false;
  },

  //marks all of the items in the todo list as completed by clicking the toggle-all checkbox
  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    allToDos.each(function(todo) {
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



