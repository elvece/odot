
var app = app || {};

//to do model
app.todo = Backbone.Model.extend({
  //ties in module js file
  moduleName: '{todo.js}',
  //sets mongo id as id attribute
  idAttribute: '_id',
  //corresponds to mongo schema
  defaults: {
    title: '',
    completed: false
  },
  // initalize:
  toggle: function(){
    //save completed status after gettting value
    this.save({
      completed: !this.get('completed')
    });
  }
});
