var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDo = new Schema ({
  title: String,
  completed: Boolean
});

module.exports = mongoose.model('todo', ToDo);
