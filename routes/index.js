var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index home");
  res.render('home');
});

module.exports = router;
