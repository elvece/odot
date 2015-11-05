var app = app || {};

var Workspace = Backbone.Router.extend({
  //*splat = set up a default route which passes the string after ‘#/’ in the url to setFilter() which sets app.TodoFilter to that string
  routes:{
    '*filter': 'setFilter'
  },

  setFilter: function(param) {
    //set the current filter to be used based on url parameters
    if (param) {
      param = param.trim();
    }
    //will be either active or completed
    app.TodoFilter = param || '';

    //trigger a collection filter event, causing hiding/unhiding of TodoView items
    app.Todos.trigger('filter');
  }
});

//create an instance of router
app.TodoRouter = new Workspace();
//routes the initial url during page load
Backbone.history.start();
