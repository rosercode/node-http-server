#!/usr/bin/env node

const config = require("./config")
const yargs = require('yargs');

// 定义自定义选项和参数
const argv = yargs
  .option('port', {
    description: 'Port number',
    alias: 'p',
    type: 'number',
    default: config.PORT
  })
  .option('dir', {
    description: 'dir',
    alias: 'd',
    type: 'string',
    default: config.BASE_URL
  })
  .option('debug', {
    description: 'debug',
    type: 'boolean',
    default: config.DEBUG
  })
  .argv;

var ejs = require('ejs')
    , morgan = require('morgan')
    , express = require('express')
    , router = require('./router.js') 
const app = express()

// 中间件函数
const myMiddleware = (req, res, next) => {
  req.dir = argv.dir;
  next();
};
// 使用中间件
app.use(myMiddleware);

if (argv.debug) {
  // 日志打印
  app.use(morgan('short'));
}else{
  console.log = function() {};
}

//设置渲染文件的目录
app.set('views', './views');
//设置html模板渲染引擎
app.engine('html', ejs.__express);
//设置渲染引擎为html
app.set('view engine', 'html');

app.use(router)

app.listen(argv.port, () => {
  console.log(`Example app listening on port ${argv.port}`)
})