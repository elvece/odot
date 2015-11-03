var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ToDo = mongoose.model('todo');


router.get('/list', function(req, res, next) {
  ToDo.find(function(err, data){
    if(err){
      throw err;
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
