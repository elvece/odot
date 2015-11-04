//Views in Backbone don’t contain the HTML markup for your application; they contain the logic behind the presentation of the model’s data to the user.

//*** APP VIEW ***//
var AppView = Backbone.View.extend({
  render: function(){

    //items from model
    var items = this.model.get('todo');
    //loop through each of to do item
    _.each(items, function(item){
      //create a new instance of the ItemView, passing it a specific model item
      var itemView = new TodoView({ model: item });
      //itemView's DOM element is appended after it has been rendered
      //return this from TodoView renders the ToDoView model
      this.$el.append( itemView.render().el );
    }, this);
  }
});



