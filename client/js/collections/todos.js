
var app = app || {};

//to do collection - all to do items

var toDoList = Backbone.Collection.extend({
  moduleName: '{todo.js}',
  url: '/todos',
  model: app.todo,
  // initalize:
  // completed:
  // remaining:
});

//global collection of all to do items
app.todos = new toDoList();
