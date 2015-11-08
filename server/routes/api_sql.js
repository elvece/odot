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
      console.log(err);
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



module.exports = router;