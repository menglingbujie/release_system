var express = require('express');
var router = express.Router();
var config = require("../config/config");

/* GET build page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '前端编译系统',build_content: "",
  project_name:config.path.project.replace(/.*\/(.*)\/(.*)\//,"$1\/$2") });
});

module.exports = router;
