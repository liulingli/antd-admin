//清空文件夹
const fs = require('fs');
const deleteFolder =  function(path) {
  let files = [];
  console.log(path,fs.existsSync(path));
  if(fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      const curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolder('./dist');