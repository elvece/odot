var TodoView = Backbone.View.extend({

  tagName:  'li',

  //cache the template function for a single item.
  todoTpl: _.template( $('#item-template').html() ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit':   'close'
  },

  //called when the view is first created
  initialize: function(options) {
    this.$el = $('#todo');
    //to access passed options in your view
    this.options = options || {};
  },

  //renders to do item titles
  render: function() {
    //$el = reference to jQuery object
    //todoTpl = ref to underscore template
    //replaces html of dom element with the instantiated template containing the model's attributes
    this.$el.html(this.todoTpl( this.model.attributes ));
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    //executed when todo label is double clicked
  },

  close: function() {
    //executed when todo loses focus
  }
});

//create a view for a todo
var todoView = new TodoView({model: todo});
