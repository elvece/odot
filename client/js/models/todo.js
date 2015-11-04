
// var app = app || {};

//to do model
var todo = Backbone.Model.extend({
  //ties in module js file
  // moduleName: '{todo.js}',
  // //sets mongo id as id attribute
  // id: '_id',
  //Default to do item attribute values
  defaults: {
    title: '',
    completed: false
  },
  initialize: function(){
    console.log('model initalized');
    this.on('change:title', function(){
      console.log('title value for this model has changed.');
    });
  },
  setTitle: function(newTitle){
    this.set({ title: newTitle });
  }
  // toggle: function(){
  //   //save completed status after gettting value
  //   this.save({
  //     completed: !this.get('completed')
  //   });
  // }
});

//*** PRACTICE TESTING ***//
//new instance of model with default values
var todo1 = new todo();
//new instance of model with set values
var todo2 = new todo({
  title: "testing todo2",
  completed: true
});
//another test to do model
var todo3 = new todo({
  title: "testing todo3",
  completed: true
});
var myTodo = new todo();
//logs {"title":"","completed":false}
console.log(JSON.stringify(todo1));
//Logs title with models get method
console.log(todo2.get('title'));
//logs completed value with models get method
console.log(todo2.get('completed'));
//logs whole json object : Object {title: "testing title", completed: true}
console.log(todo2.toJSON());
//creating a test variable that is JSON object, which reads or clones all of a model’s data attributes
var test = todo2.toJSON();
//logs {"title":"testing title","completed":true}
console.log(JSON.stringify(test));
// Set map of attributes through Model.set():
todo1.set({
  title: "setting attributes",
  completed: true
});
//logs {"title":"setting attributes","completed":true}
console.log(JSON.stringify(todo1));
//sets completed attribute to false
todo3.set('completed', false);
//logs false
console.log(todo3.get('completed'));
//both of the following changes trigger the listener
myTodo.set('title', 'Check what\'s logged.');
myTodo.setTitle('Go fishing on Sunday.');
//but, this change type is not observed, so no listener is triggered
myTodo.set('completed', true);
console.log('Todo set as completed: ' + myTodo.get('completed'));

