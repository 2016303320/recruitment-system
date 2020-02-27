const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const resume = require('./routers/api/resume')
const db = require('./config/keys').mongoURI

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(morgan('short')) // 打印日志中间件

app.get('/admin',(req, res) => {
  res.redirect('/#/admin')
})

app.use(express.static(path.join(__dirname, 'public')))
// 连接数据库
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => { console.log('mongodb connect...') })
  .catch(err => { console.log(err) })
// 开启跨域
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
  // res.header("Access-Control-Allow-Headers","Authorization")
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Credentials",true); //带cookies
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options')
    {res.status(200).end();} // 让options尝试请求快速结束
  else
    {next();}
})
app.use('/api/resume', resume)

// app.use(function (req, res, next) {
//   if (req.path === '/api/users/login') {
//     next()
//   } else {
//     var token = req.body.token || req.query.token || req.headers['authorization']
//     if (token) {
//       // 解码 token (验证 secret 和检查有效期（exp）)
//       jwt.verify(token, jwtKeys, function (err, decoded) {
//         if (err) {
//           return res.status(401).json({ success: 0, message: '无效的token.' })
//         } else {
//           // 如果验证通过，在req中写入解密结果
//           req.body.schoolNum = decoded.schoolNum
//           req.body.id = decoded.id
//           console.log(`${new Date().toLocaleString()} ${req.body.schoolNum}`)
//           next() // 继续下一步路由
//         }
//       })
//     } else {
//       // 没有拿到token 返回错误
//       return res.status(401).json({
//         success: 0,
//         message: '没有找到token.'
//       })
//     }
//   }
// })
// app.use('/api/users', users)
// app.use('/api/goods', goods)
// app.use('/api/release', release)
// app.use('/api/collect', collect)
// app.use('/api/mail', mail)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
