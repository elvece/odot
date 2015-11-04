
//*** TO DO VIEW ***//
var TodoView = Backbone.View.extend({

  //creates view element, defaults to div
  tagName:  'li',
  //sets class name of this element
  className: '',

  //cache the template function for a single item.
  todoTpl: _.template($('#item-template').html()),
  //jQuery’s .delegate() underneath - don’t have to worry about whether a particular element has been rendered to the DOM yet or not
  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  //called when the view is first created
  initialize: function(options) {
    //binds a function to an object so that anytime the function is called the value of this will be the object
    this.model.bind('change', _.bind(this.render, this));
    this.$el = $('#todo');
    //to access passed options in your view
    this.options = options || {};
  },

  //render defines the logic for rendering a template
  //renders to do item titles
  render: function() {
    //$el = reference to jQuery object
    //todoTpl = ref to underscore template
    //replaces html of dom element with the instantiated template containing the model's attributes
    this.$el.html(this.todoTpl(this.model.attributes));
    //what is this doing
    this.input = this.$('.edit');
    //convention to return this, as it makes views reusable in parent views and renders all elements once the entire list is populated
    return this;
  },

  edit: function() {
    //executed when todo label is double clicked
  },

  close: function() {
    //executed when todo loses focus
  },

  updateOnEnter: function(e) {
  // executed on each keypress when in todo edit mode,
  }
});

//create a view for a todo
var todoView = new TodoView({model: todo});
