const express = require('express');
const router = express.Router();
console.log("api loaded");

router.get('/', function(req,res, next) {
  res.send("Welcome to the API");
});

router.get('/user', function(req,res) {
  res.json({
    "cod": 200
  });
});

module.exports = router;
