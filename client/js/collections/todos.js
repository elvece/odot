var app = app || {};

//*** TO DO COLLECTION ***//

app.TodoList = Backbone.Collection.extend({

  model: app.todo,

  url: '/api/todos',

  //filters down the list of all to do items that are completed
  completed: function() {
    return this.where({completed: true});
  },

  //filter list to only to do items that are incomplete
  remaining: function() {
    return this.where({completed: false});
  },

  //generates the next order number for new items so to dos are in sequential order
  nextOrder: function() {
    return this.length ? this.last().get('order') + 1 : 1;
  },

  comparator: 'order'
  // comparator: function(todo){
  //   return todo.get('order')
  // }

});

//global collection
app.Todos = new app.TodoList();
