
var file = require("fs");
var config = require("../config/config");
var isBuildStatusFileExist = file.existsSync(config.path.build_status_file);
module.exports.isBuildActivity = function(){
  var _isBdFileExist = file.existsSync(config.path.build_status_file);
  if(_isBdFileExist){
    var _fcontent=  file.readFileSync(config.path.build_status_file);
    if(_fcontent&&(_fcontent==1||_fcontent=="1")){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
module.exports.createBuildStatusFile = function(){
  file.writeFileSync(config.path.build_status_file,0);
}
module.exports.changeBuildStatus = function(v){
  //文件不存在就创建一个编译状态文件，初始值为false
  if(!isBuildStatusFileExist){
    this.createBuildStatusFile();
    return;
  }
  var _fileContent = file.readFileSync(config.path.build_status_file);
  file.writeFileSync(config.path.build_status_file,v);
  return;
}
