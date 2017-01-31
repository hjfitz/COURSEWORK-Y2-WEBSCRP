const express = require('express');
const api = express.Router();
const dbUtil = require('../util/db');
const sqliteDB = dbUtil.db;
const config = require('../util/config.json');

api.get('/', function(req, res, next) {
  res.send("oioi");
})

api.get('/todos', function(req, res, next) {
  sqliteDB.all('select * from todo', function(err, todos) {
    if (err)  {
      res.send(err); //make a callback function to handle this
    } else {
      res.json(todos);
    }
  });
});

api.get('/config', function(req, res, next) {
    res.json(config);
});

api.post('/add/todo', function(req, res, next) {
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
        errors:"",
        text: "Successfully inserted!",
        params: [
          req.body.title,
          req.body.desc
        ]
      });
    }
  });
});

module.exports = api;
