var express = require('express');
var router = express.Router();

var pkg = require('../package.json');

router.get('/', function(req, res, next) {
  res.send({
    version: pkg.version
  });
});

module.exports = router;
