var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDo = new Schema ({
  title: String,
  completed: Boolean,
  created: {type : Date, default: Date.now}
});

module.exports = mongoose.model('todo', ToDo);
