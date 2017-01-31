const express = require('express');
const api = express.Router();
const dbUtil = require('../util/db');
const sqliteDB = dbUtil.db;
const config = require('../util/config.json');

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

module.exports = api;
