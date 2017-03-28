const express = require('express')
const configRouter = express.Router()

configRouter.get('/', (req, res, next) => {
  if (err) throw err;
  res.json('{status:200}')
})

configRouter.post('/', (req, res, next) => {
  res.send(__dirname)
})

module.exports = configRouter
