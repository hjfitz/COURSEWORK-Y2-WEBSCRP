const express = require('express');
const router = express.Router();
const dbUtil = require('../util/db');
const sqliteDB = dbUtil.db;

/* GET home page. */
router.get('/', function(req, res, next) {
  sqliteDB.all('select * from todo', function(err, todos) {
      res.render('index', {
        title: 'ws_cwk3',
        "todos": todos
      });
   });
});

router.get('/budget', function(req,res,next) {
  res.render('budget', {title: "budget" });
});

router.get('/todo', function(req,res,next) {
  sqliteDB.all('select * from todo', function(err, todos) {
    res.render('todo', {
      "title": "To-do List",
      "todos": todos,
      "todo": "class=active"
    });
  });
});

router.get('/news', function(req,res,next) {
  res.render('news', {
    "title": "News",
    "news": "class=active"
  });
});



module.exports = router;
