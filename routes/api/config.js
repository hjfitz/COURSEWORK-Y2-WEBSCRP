const express = require('express')
const configRouter = express.Router()

configRouter.get('/', (req, res, next) => {
  res.json(__dirname)
})

configRouter.post('/', (req, res, next) => {
  res.send(__dirname)
})

module.exports = configRouter
