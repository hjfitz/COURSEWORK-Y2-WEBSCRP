const express = require('express');
const router = express.Router();
const dbUtil = require('../util/db');
const sqliteDB = dbUtil.db;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ws_cwk3' });
});

router.get('/budget', function(req,res,next) {
  res.render('budget', {title: "budget" });
});


//db get for todo, send in json + list or something
router.get('/todo', function(req,res,next) {
  sqliteDB.all('select * from todo', function(err, todos) {
    res.render('todo', {
      "title": "todo",
      "todos": todos,
      "todo": "class=active"
    });
  });
});

module.exports = router;
