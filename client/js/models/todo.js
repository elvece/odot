var app = app || {};

//*** TO DO MODEL ***//

app.todo = Backbone.Model.extend({

  defaults: {
    title: '',
    completed: false
  },

  //corresponds to mongo id so backbone can recognize id as unique identifier
  idAttribute: '_id',

  initialize: function(){
    this.on('change:title', function(){
    });
  },

  setTitle: function(newTitle){
    this.set({title: newTitle});
  },

  toggle: function(){
    this.save({
      //sets to opposite
      completed: !this.get('completed')
    });
  }
});
