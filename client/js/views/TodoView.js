//instances of this view will be associated with each individual to do record
//todo instances can handle editing, updating, and destroying their associated todo.

var app = app || {};

//*** TO DO VIEW ***//

app.TodoView = Backbone.View.extend({

  tagName: 'li',

  template: _.template($('.item-template').html()),

  events: {
    'click input.toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.model, 'destroy', this.remove);

    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  render: function() {

    this.$el.html(this.template(this.model.attributes));
    // this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));

    this.toggleVisible();

    this.$input = this.$('.edit');

    // console.log('to do view render', this)
    return this;
  },

  //toggles visibility of item
  toggleVisible: function() {
    this.$el.toggleClass('hidden',  this.isHidden());
  },

  //determines if item should be hidden and updates accordingly
  isHidden: function () {
    return this.model.get('completed') ?
      app.TodoFilter === 'active' :
      app.TodoFilter === 'completed';
  },

  //toggles the completed state of the model
  toggleCompleted: function() {
    this.model.toggle();
  },

  //activated when todo label is double clicked
  edit: function() {
    this.$el.addClass('editing');
    // console.log('editing')
    this.$input.focus();
  },

  //closes editing mode, saves model changes
  close: function() {
    var value = this.$input.val().trim();
    console.log(this.$input.val().trim())
    // !this.model.isNew()
    // if (value) {
    //   this.model.fetch()
    //   console.log(this.model)
    //   this.model.save({title: value});
    // } else {
    //     // this.input.val(this.model.get('title'))
    //     this.clear();
    //   }
    console.log(this.model)
    this.model.fetch();
        console.log(this.model)

    this.model.save();
    this.$el.removeClass('editing');
  },

  //checks if enter key press
  updateOnEnter: function(event) {
    // console.log('fire')
    if (event.which === ENTER_KEY) {
      //closes edit input
      // console.log('close on enter update')
      this.close();
    }
  },

  //remove the item, destroy the model and delete its view
  clear: function() {
    // console.log('clear')
    this.model.destroy();
  }
});
