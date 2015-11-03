var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ToDo = mongoose.model('todo');


router.get('/todos', function(req, res, next) {
  ToDo.find(function(err, data){
    if(err){
      throw err;
    } else {
      res.json(data);
    }
  });
});

router.post('/todos', function(req, res, next){
  var newToDo = new ToDo({
    title: req.body.title,
    completed: false
  });

  newToDo.save(function(err, data){
    if (err){
      throw err;
    } else {
      res.json({Message:'To do item saved!'});
    }
  });
});

router.delete('/todo/:id', function(req, res, next){
  var id = {"_id": req.params.id};
  ToDo.findOneAndRemove(id, function(err, data){
    if(err){
      throw err;
    } else {
      res.json({Message: 'To do item removed.'});
    }
  });
});

router.put('/todo/:id', function(req, res, next){
  var id = {"_id": req.params.id};
  var payload = {
    title: req.body.title,
    completed: req.body.completed,
  };
  ToDo.findOneAndUpdate(id, payload, function(err, data){
    if (err){
      throw err;
    } else {
      res.json({Message: 'To do item updated.'});
    }
  });
});


module.exports = router;
