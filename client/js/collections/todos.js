var app = app || {};

//*** TO DO COLLECTION ***//

app.TodoList = Backbone.Collection.extend({

  model: app.todo,

  url: '/api/todos',

  //filters down the list of all to do items that are completed
  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

  //filter list to only to do items that are incomplete
  remaining: function() {
    return this.without.apply(this, this.completed());
  },

  //generates the next order number for new items so to dos are in sequential order
  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function( todo ) {
    return todo.get('order');
  }
});

//global collection
app.Todos = new app.TodoList();
