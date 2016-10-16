var express = require('express');
var router = express.Router();

var childProcess = require("child_process");

/* GET build page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Release System',build_content: "hello" });
});
router.post("/",function(req,res,next){
  var _buildProcess = childProcess.execFile("/Users/menglingjun/work/git/release_system/public/shells/build.sh",[],null,function(err,stdout,stderr){
    // console.log("=error:",err);
    // console.log("=out:",stdout);
    // if(err||stderr){
    //   return;
    // }
    // console.log("==out error:",stderr);
    if(err){
      res.send(200,{error_msg:err,ret:0});
      res.end();
    }

    if(stderr){
      res.send(200,{error_msg:stderr,ret:0});
      res.end();
    }
    res.send(200,{ret:1,msg:stdout});
    res.end();
  })

})
module.exports = router;
