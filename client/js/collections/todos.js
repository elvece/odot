
// var app = app || {};

//*** TO DO COLLECTION - all to do items ***//

//to start, data will persist on local storage so I can acheive an MVP
var TodoList = Backbone.Collection.extend({

  //reference to this collection's model
  model: todo,

  //save all of the to do items in local storage
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  //filters down the list of all to do items that are completed
  completed: function() {
    //filter is underscore method
    return this.filter(function( todo ) {
      //gets attribute completed's boolean value
      return todo.get('completed');
    });
  },

  //filter list to only to do items that are incomplete
  remaining: function() {
    //without is underscore method
    return this.without.apply( this, this.completed() );
  },

  //generates the next order number for new items so to dos are in sequential order
  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    //last is underscore method
    return this.last().get('order') + 1;
  },

  //to dos are sorted by their original insertion order
  comparator: function( todo ) {
    return todo.get('order');
  }
});

//creates global collection of all to do items
var allToDos = new TodoList();
