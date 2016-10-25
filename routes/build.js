var express = require('express');
var router = express.Router();
var childProcess = require("child_process");
var path = require("path");
var config = require("../config/config");
var BuildModel = require("../model/build");

/* GET build page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '前端编译系统',build_content: "" });
});
function doBuild(req,res,build_file){
  var _startTime = (new Date()).getTime();
  //检查编译状态文件，如果有人正在编译则提示他
  var _isBdActivity = BuildModel.isBuildActivity();
  if(_isBdActivity){
    return res.status(200).json({ret:0,msg:"",error_msg:"其他人正在编译，请稍等..."});
  }
  //标记编译状态设置为开启编译
  BuildModel.changeBuildStatus(1);
  var _parms = [config.path.project,config.path.error_logs];
  try{
  var _buildProcess = childProcess.execFile(build_file,_parms,null,function(err,stdout,stderr){
    //线程关闭后重置编译状态
    BuildModel.changeBuildStatus(0);
    if(!stdout&&(err||stderr)){
      res.status(200).json({ret:0,msg:"",error_msg:stderr.replace(/\r|\n|↵/g,"<br />")});
      return;
    }
    if(stdout&&(stdout==0||stdout=="0")){
      var _endTime = (new Date()).getTime();
      var _crossTime = (_endTime-_startTime)/1000;
      res.status(200).json({ret:1,msg:"编译完成, 用时"+_crossTime+"秒"});
    }else{
      if(stderr){
        res.status(200).json({ret:0,msg:"",error_msg:stderr.replace(/\r|\n|↵/g,"<br />")});
      }else{
        res.status(200).json({ret:0,msg:"",error_msg:stdout.replace(/\r|\n|↵/g,"<br />")});
      }
    }
    res.end();
  })
}catch(e){
  BuildModel.changeBuildStatus(0);
  res.status(200).json({ret:0,msg:"",error_msg:e.toString()});
}
}
router.post("/code",function(req,res,next){
  doBuild(req,res,config.path.build_code_shell);
});

router.post("/res",function(req,res,next){
  doBuild(req,res,config.path.build_res_shell);
});

module.exports = router;
