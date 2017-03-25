const express = require('express')
const router = express.Router()
const dbUtil = require('../util/db')
const sqliteDB = dbUtil.db
/* GET home page. */
router.get('/', function (req, res, next) {
  sqliteDB.all('select * from todo', (err, todos) => {
    if (err) console.error(err)
    res.render('index-2', {
      title: 'ws_cwk3',
      'todos': todos
    })
  })
})

router.get('/drag', function (req, res, next) {
  sqliteDB.all('select * from todo', (err, todos) => {
    if (err) console.error(err)
    res.render('index-dragdrop', {
      title: 'ws_cwk3',
      'todos': todos
    })
  })
})

router.get('/flow', function (req, res, next) {
  sqliteDB.all('select * from todo', (err, todos) => {
    if (err) console.error(err)
    res.render('index-freeflow', {
      title: 'ws_cwk3',
      'todos': todos
    })
  })
})

router.get('/flow-dyncard', function (req, res, next) {
  sqliteDB.all('select * from todo', (err, todos) => {
    if (err) console.error(err)
    res.render('index-freeflow-dyncard', {
      title: 'ws_cwk3',
      'todos': todos
    })
  })
})

router.get('/budget', function (req, res, next) {
  res.render('budget', { title: 'budget' })
})

router.get('/todo', function (req, res, next) {
  res.render('../public/own-packages/newTodo/todoMin', {
    'title': 'To-do List Version 2',
    'weather': 'class=hidden',
    'todo': 'class=active'
  })
})

router.get('/config', function (req, res, next) {
  res.render('config', {
    'title': 'configuration'
  })
})

router.get('/news', function (req, res, next) {
  res.render('news', {
    'title': 'News',
    'news': 'class=active'
  })
})

router.get('/cal', function (req, res, next) {
  res.render('gapi-auth', {
    'title': 'gapi attempt'
  })
})

router.get('/loc', function (req,res,next) {
    res.render('setLocation', {
        'title': 'location attempt'
    })
})

router.get('/test', function(req,res,next) {
  res.render('index-rewrite', {
    'title': 'test'
  })
})

module.exports = router
