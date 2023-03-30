var ejs = require('ejs')
    , morgan = require('morgan')
    , express = require('express')
    , router = require('./router.js') 
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

app.use(router)

const config = require("./config")

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})
