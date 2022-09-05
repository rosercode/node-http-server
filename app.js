const express = require('express')
var ejs = require('ejs');
var morgan = require('morgan');

const app = express()
const port = 3000

// 日志打印

app.use(morgan('short'));

//设置渲染文件的目录
app.set('views', './views');
//设置html模板渲染引擎
app.engine('html', ejs.__express);
//设置渲染引擎为html
app.set('view engine', 'html');

base_url = 'D:\\video'

//调用路由，进行页面渲染
app.get('/*', function (req, resp) {
  const fs = require('fs');
  const path = require('path');
  var filepath = decodeURI(base_url + req.path.replace(/\//g, path.sep))
  // console.log(filepath);

  fs.exists(filepath, (exists) => {
    // console.log(filepath);
    if (exists) {

      fs.stat(filepath, function (err, data) {
        if (data.isFile()) {
          console.log('file');

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
            console.log("Video");
            resp.writeHead(200);
            var rs = fs.createReadStream(filepath);
            rs.pipe(resp);

            rs.on('end', function () {
              resp.end();
              console.log('video finish');
            });
          } else {
            var rs = fs.createReadStream(filepath);
            // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
            resp.writeHead(200);
            // 将可读流传给响应对象resp
            rs.pipe(resp);
          }

        }

        if (data.isDirectory()) {
          console.log('dir');

          fs.readdir(filepath, function (err, files) {

            for (let i = 0; i < files.length; i++) {
              var file = files[i]
              var stat = fs.statSync(base_url + path.sep + decodeURI(req.path.replace(/\//g, path.sep)) + path.sep + file)
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
              resp.render('index', {
                //传参
                title: '首页', path: new_path, files: files
              });
            }
          });

        }
      })
    } else {
      resp.send('文件不存在')
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function isAssetTypeVideo(ext) {
  return [
    'mp4', 'flv', 'avi', 'mov', 'wmv', 'mkv'].
    indexOf(ext.toLowerCase()) !== -1;
}