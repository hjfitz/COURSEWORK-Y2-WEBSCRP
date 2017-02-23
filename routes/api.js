const express = require('express');
const api = express.Router();
const dbUtil = require('../util/db');
const sqlite3 = require('sqlite3');
const sqliteDB = dbUtil.db;
const config = require('../util/config.json');

//welcome
api.get('/', function(req, res, next) {
  res.send("Welcome to APIv1!");
})

//config hosting
api.get('/config', function(req, res, next) {
    res.json(config);
});


//api stuff for todos
api.get('/todos', function(req, res, next) {
  sqliteDB.all('select rowid, * from todo', function(err, todos) {
    if (err)  {
      res.send(err); //make a callback function to handle this
    } else {
      res.json(todos);
    }
  });
});

/*
 * changes a todo (idempotent!) depending on the ID given
 * takes information from the body and changes, using a simple update query
 */
api.put('/todos/:id', function(req,res,next) {
  console.log(req.params.id);
  console.log(req.body.title);
  console.log(req.body.desc);
  console.log("Attempting put on rowid: " + req.params.id);
  sqliteDB.run('update todo set title =$title, desc= $desc where rowid = $rowid', {
    $title: req.body.title,
    $desc: req.body.desc,
    $rowid: req.params.id
  }, function(err) {
    if (err) {
      console.error("PUT failed on /todos/:id: " + err);
      res.json({
        code:500,
        errors: err
      });
    } else {
      res.json({
        code:200,
        text: "successfully updated!"
      });
    }
  });
});

api.post('/todos', function(req, res, next) {
  console.log(req.body);
  sqliteDB.run('INSERT INTO todo (title, desc) VALUES ($title, $desc)', {
    $title: req.body.title,
    $desc: req.body.desc
  }, function(err) {
    if (err) {
      console.error("POST on /add/todo failed: " + err);
      res.json({
        code:500,
        errors: err
      });
    } else {
      res.json({
        code:200,
        text: "Successfully inserted!",
        params: [
          req.body.title,
          req.body.desc
        ]
      });
    }
  });
});

api.delete('/todos/:id', function(req,res,next) {
  console.log(req.params.id);
  sqliteDB.run('DELETE FROM todo WHERE rowid=$rowid', {
    $rowid: req.params.id
  }, function(err) {
    if (err) {
      console.error("DELETE on /add/todo failed: " + err);
      res.json({
        code:500,
        errors: err
      });
    } else {
      res.json({
        code:200,
        text: "Successfully deleted"
      });
    }
  });
});

module.exports = api;
