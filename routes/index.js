var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ws_cwk3' });
});

router.get('/budget', function(req,res,next) {
  res.render('budget', {title: "budget" });
});

module.exports = router;
