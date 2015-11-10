var app = app || {};

//*** TO DO MODEL ***//

app.todo = Backbone.Model.extend({
  urlRoot: '/api/todos',

  defaults: {
    title: '',
    completed: false
  },

  //corresponds to mongo id so backbone can recognize id as unique identifier
  // idAttribute: '_id',

  toggle: function(){
    this.save({
      //sets to opposite
      completed: !this.get('completed')
    });
  }
});
