const express = require('express')
const api = express.Router()
//require deeper routes
const todoRouter = require('./todo')
const configRouter = require('./config')
//require external files
const dbUtil = require('../../util/db')
const sqliteDB = dbUtil.db
const config = require('../../util/serverconfig.json')
const helpers = require('../../util/express-helpers')
//configure main route
api.use('/todos', todoRouter)
api.use('/configuration', configRouter)

/**
 * MAIN API
 * Maybe something to do with documentation in future?
 */
api.get('/', (req, res, next) => {
  res.send('Welcome to APIv1!')
})

module.exports = api
