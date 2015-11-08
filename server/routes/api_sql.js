var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'index.html'));
});

router.post('/todos', function(req, res){
  var results = [];
  var data = {title: req.body.title, completed: false};

  pg.connect(connectionString, function(err, client, done) {
    if (err){
      done();
      // console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query("INSERT INTO items(title, completed) values($1, $2)", [data.title, data.complete]);

    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    query.on('row', function(row) {
        results.push(row);
    });
    query.on('end', function() {
        done();
        return res.json(results);
    });

  });
});

router.get('/todos', function(req, res){
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    if (err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query('SELECT * FROM items ORDER BY id ASC;');

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });
  });
});


router.put('/todos/:id', function(req, res) {
  var results = [];
  var id = req.params.id;
  var data = {title: req.body.title, completed: req.body.completed};

  pg.connect(connectionString, function(err, client, done) {
      if(err) {
        done();
        console.log(err);
        return res.status(500).send(json({ success: false, data: err}));
      }

      client.query("UPDATE items SET title=($1), completed=($2) WHERE id=($3)", [data.title, data.completed, id]);

      var query = client.query("SELECT * FROM items ORDER BY id ASC");

      query.on('row', function(row) {
          results.push(row);
      });

      query.on('end', function() {
          done();
          return res.json(results);
      });
  });

});

module.exports = router;
