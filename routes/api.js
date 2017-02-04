const express = require('express');
const api = express.Router();
const dbUtil = require('../util/db');
const sqliteDB = dbUtil.db;
const config = require('../util/config.json');

api.get('/', function(req, res, next) {
  res.send("Welcome to APIv1!");
})


/******************/
/*                */
/*   SERVER GET   */
/*                */
/******************/

api.get('/todos', function(req, res, next) {
  sqliteDB.all('select rowid, * from todo', function(err, todos) {
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


/*******************/
/*                 */
/*   SERVER POST   */
/*                 */
/*******************/

api.post('/todo/add', function(req, res, next) {
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

api.post('/todo/edit', function(req,res,next) {
  sqliteDB.run('UPDATE TODO set title = $title, desc = $desc where rowid = $rowid', {
    $rowid: req.body.rowid,
    $title: req.body.title,
    $desc: req.body.desc
  }, function(err) {
    if (err) {
      console.error("Error with POST on /todo/edit: " + err);
      res.json({
        code:500,
        errors: err
      });
    } else {
      res.json({
        code:200,
        text: "Successfully updated!",
        params: req.body
      });
    }
  });
});

module.exports = api;
