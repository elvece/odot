//instances of this view will be associated with each individual to do record
//todo instances can handle editing, updating, and destroying their associated todo.

var app = app || {};

//*** TO DO VIEW ***//
app.TodoView = Backbone.View.extend({

  //creates view element, defaults to div
  tagName: 'li',
  //sets class name of this element
  className: '',

  //cache the template function for a single item
  todoTemplate: _.template($('#item-template').html()),

  //DOM events specific to an item
  //jQuery’s .delegate() underneath - don’t have to worry about whether a particular element has been rendered to the DOM yet or not
  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  //TodoView listens for changes to its model, then re-renders
  //because 1-1 correspondence between a todo and a a ToDoView, direct reference on the model is set
  initialize: function(options) {
    //binds a function to an object so that anytime the function is called the value of this will be the object
    // this.model.bind('change', _.bind(this.render, this));
    // this.$el = $('#todo');
    //to access passed options in your view
    // this.options = options || {};

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  //render defines the logic for rendering a template
  //renders to do item titles
  render: function() {
    //$el = reference to jQuery object
    //todoTemplate = ref to underscore template
    //replaces html of dom element with the instantiated template containing the model's attributes
    this.$el.html(this.todoTemplate(this.model.attributes));

    //toggles the completed class on the element depending on the model’s completed state
    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();

    //caching the input element within the instantiated template
    this.$input = this.$('.edit');
    //convention to return this, as it makes views reusable in parent views and renders all elements once the entire list is populated
    return this;
  },

  //toggles visibility of item
  toggleVisible: function () {
    this.$el.toggleClass( 'hidden',  this.isHidden());
  },

  //determines if item should be hidden and updates accordingly
  isHidden: function () {
    var isCompleted = this.model.get('completed');
    return ( // hidden cases only
      (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
    );
  },

  //toggles the completed state of the model
  togglecompleted: function() {
    this.model.toggle();
  },


  //activated when todo label is double clicked
  edit: function() {
    //sets element class to editing for tracking
    this.$el.addClass('editing');
    //displays input field
    this.$input.focus();
  },

  //closes editing mode, saves model changes
  close: function() {
    //changed value
    var value = this.$input.val().trim();
    //if there is a value
    if (value) {
      //save it as the title attribute of the model
      this.model.save({title: value});
    } else {
        //otherwise destroy
        this.clear();
      }
    //remove editing class to deactive tracking
    this.$el.removeClass('editing');
  },

  //checks if enter key press and executes close function above
  updateOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      //closes edit input
      this.close();
    }
  },

  //remove the item, destroy the model from localStorage and delete its view
  clear: function() {
    //removes the model from the Todos collection, which triggers a remove event on the collection
    this.model.destroy();
  }
});

//to create a view for a todo
//var todoView = new TodoView({model: todo});
