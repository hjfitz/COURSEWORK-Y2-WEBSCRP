const express = require('express')
const router = express.Router()
const dbUtil = require('../util/db')
const sqliteDB = dbUtil.db
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ws_cwk3'
  })
})

router.get('/todo', function (req, res, next) {
  res.render('../public/own-packages/newTodo/todoMin', {
    'title': 'To-do List Version 2',
    'weather': 'class=hidden'
  })
})

router.get('/config', function (req, res, next) {
  res.render('config', {
    'title': 'configuration'
  })
})

router.get('/loc', function (req,res,next) {
    res.render('setLocation', {
        'title': 'location attempt'
    })
})


module.exports = router
