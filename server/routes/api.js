var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ToDo = mongoose.model('todo');

//get ALL to do items
router.get('/todos', function(req, res, next) {
  ToDo.find(function(err, data){
    if(err){
      throw err;
    } else {
      res.json(data);
    }
  });
});

//get SINGLE to do item
router.get('/todo/:id', function(req, res, next) {
  id = {"_id": req.params.id};
  ToDo.findOne(id, function (err, data){
    if (err){
      throw err;
    } else {
    res.json(data);
    }
  });
});

//ADD new to do item
router.post('/todos', function(req, res, next){
  var newToDo = new ToDo({
    title: req.body.title,
    completed: false,
  });

  newToDo.save(function(err, data){
    if (err){
      throw err;
    } else {
      res.json({Message:'To do item saved!'});
    }
  });
});

//DELETE to do item
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

//UPDATE to do item
router.put('/todo/:id', function(req, res, next){
  var id = {"_id": req.params.id};
  ToDo.findOneAndUpdate(id, req.body, function(err, data){
    if (err){
      throw err;
    } else {
      res.json({Message: 'To do item updated.'});
    }
  });
});


module.exports = router;
