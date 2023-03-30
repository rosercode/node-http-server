var express = require('express')
    ,fs = require('fs')
    ,path = require('path');
    
var router = express.Router()

var config = require("./config")

//调用路由，进行页面渲染
router.get('/*', function (req, res) {
  
    var filepath = decodeURI(config.BASE_URL + req.path.replace(/\//g, path.sep))
    fs.exists(filepath, (exists) => {
      if (exists) {
  
        fs.stat(filepath, function (err, data) {
          if (data.isFile()) {
  
            //获取后缀
            var ext = (function(){
              var idx1 = filepath.lastIndexOf(".");
              return filepath.substr(idx1 + 1);
            })()
  
            var filename = (function(){
              var idx2 = filepath.lastIndexOf(path.sep);
              return req.path.substr(idx2)
            })()
  
            if (isAssetTypeVideo(ext)) {
              console.log('文件-视频文件');
              if(req.query.play!= undefined){
                  const range = req.headers.range;
                  if (!range) {
                      res.status(400).send("Requires Range header");
                  }
                  const videoPath = filepath;
                  console.log('视频播放路径' + filepath);
                  const videoSize = fs.statSync(videoPath).size;
                  const CHUNK_SIZE = 10 ** 6;
                  const start = Number(range.replace(/\D/g, ""));
                  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                  const contentLength = end - start + 1;
                  const headers = {
                      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                      "Accept-Ranges": "bytes",
                      "Content-Length": contentLength,
                      "Content-Type": "video/mp4",
                  };
                  res.writeHead(206, headers);
                  const videoStream = fs.createReadStream(videoPath, { start, end });
                  videoStream.pipe(res);
  
                }else{
                    console.log('调用渲染模板');
                    //调用渲染模板
                    res.render('video', {
                   //传参
                        title: '首页', path: req.path.replace(/\//g, path.sep)
                  });
                }
            }else{
              console.log('文件-一般文件（不是视频文件）');
              var rs = fs.createReadStream(filepath);
              // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
              res.writeHead(200);
              // 将可读流传给响应对象resp
              rs.pipe(res);
            }
  
          }
  
          if (data.isDirectory()) {
            console.log('文件-目录文件');
  
            fs.readdir(filepath, function (err, files) {
              for (let i = 0; i < files.length; i++) {
                var file = files[i]
                var stat = fs.statSync(config.BASE_URL + path.sep + decodeURI(req.path.replace(/\//g, path.sep)) + path.sep + file)
                if (stat.isDirectory()) {
                  files[i] = file + '/'
                }
              }
  
              if (err) {
                console.log('Error', err);
              } else {
                new_path = ''
                if(req.path != '/'){
                  new_path =  decodeURI(req.path)
                }
  
                //调用渲染模板
                res.render('index', {
                  //传参
                  title: '首页', path: new_path, files: files
                });
              }
            });
  
          }
        })
      } else {
        console.log('文件路径不存在: ' + filepath);
        res.send('文件路径不存在: ' + filepath);
      }
    })
  });
  
  
function isAssetTypeVideo(ext) {
    return [
      'mp4', 'flv', 'avi', 'mov', 'wmv', 'mkv'].
      indexOf(ext.toLowerCase()) !== -1;
  }

module.exports = router
