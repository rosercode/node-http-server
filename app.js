const express = require('express')
const app = express()
const port = 3000

// 日志打印
var morgan = require('morgan');

app.use(morgan('short'));

app.use('/uuid', express.static('../Video'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})