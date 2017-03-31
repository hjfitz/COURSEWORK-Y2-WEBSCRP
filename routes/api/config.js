const express = require('express')
const util = require('../../util/util.js')
const configRouter = express.Router()
const fs = require('fs')
const configFile = '../../util/userconfig.json'
// const

configRouter.get('/', (req, res, next) => {
  var userConfig = require(configFile)
  res.json(userConfig)
})

configRouter.get('/:item', (req, res, next) => {
  var configItem = req.params.item
  //need to figure out a way for hot-reloading config. //TODO
  var userConfig = require(configFile)
  console.log(userConfig)
  if (configItem in userConfig) {
    res.json(userConfig[configItem])
  } else {
    res.json({status:500})
  }
})

configRouter.patch('/:item', (req, res, next) => {
  var configItem = req.params.item
  var userConfig = require(configFile)
  console.log(configItem)
  if (configItem in userConfig) {
    console.log(userConfig)
    userConfig[configItem] = req.body
    console.log(configItem)
    console.log(req.body)
    saveConfig(userConfig)
    res.json({status:200})
  } else {
    res.json({status:500, error: 'configuration option non-existant!'})
  }
})

function saveConfig(userConfig) {
  var formattedConfig = JSON.stringify(userConfig)
  fs.writeFileSync('util/userconfig.json', formattedConfig)
}


module.exports = configRouter
