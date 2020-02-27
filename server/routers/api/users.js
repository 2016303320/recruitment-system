// const express = require('express')
// const router = express.Router()
// const isNpu = require('../../libs/isnpu')
// const Users = require('../../models/user')
// const goods = require('../../models/goods')
// const pwd = require('../../libs/pwd')
// const jwt = require('jsonwebtoken')
// const {
//   jwtKeys
// } = require('../../config/keys')

// /**
//  * 登陆和注册接口
//  * 返回token
//  */
// router.post('/login', (req, res) => {
//   var content = {
//     schoolNum: req.body.schoolNum
//   }
//   Users.findOne({
//     schoolNum: req.body.schoolNum
//   }).then(user => {
//     if (!user) {
//       isNpu(req.body.schoolNum, req.body.schoolPwd)
//         .then((nameFromNpu) => {
//           const newUser = new Users({
//             schoolNum: req.body.schoolNum,
//             schoolPwd: pwd.md5(req.body.schoolPwd + pwd.MD5_SUFFIX), // 数据库密码加密，pwd
//             userName: nameFromNpu,
//             avatar: 'http://biologyscience.cn/W020120313605926709865.jpg'
//           })
//           newUser
//             .save()
//             .then(user => {
//               content.id = user._id
//               res.json({
//                 success: 1,
//                 token: jwt.sign(content, jwtKeys, {
//                   expiresIn: 24 * 60 * 60 * 1 // 1天过期
//                 }),
//                 hasAvatar: false,
//                 userName: nameFromNpu,
//                 avatar: user.avatar
//               })
//             })
//         })
//         .catch(() => {
//           res.json({
//             success: 0
//           })
//         })
//     } else if (user.schoolPwd === pwd.md5(req.body.schoolPwd + pwd.MD5_SUFFIX)) {
//       content.id = user._id
//       res.json({
//         success: 1,
//         token: jwt.sign(content, jwtKeys, {
//           expiresIn: 24 * 60 * 60 * 1 // 1天过期
//         }),
//         hasAvatar: true,
//         userName: user.userName,
//         avatar: user.avatar
//       })
//     } else {
//       res.json({
//         success: 0
//       })
//     }
//   })
// })
// // 获取头像与修改姓名
// router.get('/getAvatar', (req, res) => {
//   Users.findOne({
//     _id: req.body.id
//   }).then(user => {
//     if (user != null) {
//       res.json({
//         success: 1,
//         userName: user.userName,
//         avatar: user.avatar
//       })
//     } else {
//       res.json({
//         success: 0
//       })
//     }
//   })
// })
// // 获取姓名，联系信息
// router.get('/getInfo', (req, res) => {
//   Users.findOne({
//     _id: req.body.id
//   }).then(user => {
//     if (user != null) {
//       res.json({
//         success: 1,
//         schoolNum: user.schoolNum,
//         phoneNum: user.phoneNum,
//         qqNum: user.qqNum,
//         wxid: user.wxid
//       })
//     } else {
//       res.json({
//         success: 0
//       })
//     }
//   })
// })
// // 修改联系信息
// router.post('/changeInfo', (req, res) => {
//   Users.update({
//     _id: req.body.id
//   }, {
//     phoneNum: req.body.phoneNum,
//     qqNum: req.body.qqNum,
//     wxid: req.body.wxid
//   }, {
//     multi: true
//   }).then((result) => {
//     if (result != null) {
//       res.json({
//         success: 1
//       })
//     } else {
//       res.json({
//         success: 0
//       })
//     }
//   })
// })
// // 上传头像与修改姓名
// router.post('/changeAvatar', (req, res) => {
//   Users.update({
//     _id: req.body.id
//   }, {
//     avatar: req.body.avatar,
//     userName: req.body.userName
//   }, {
//     multi: true
//   }).then((result) => {
//     goods.update({
//       userId: req.body.id
//     }, {
//       avatar: req.body.avatar,
//       userName: req.body.userName
//     }, {
//       multi: true
//     }).then((ress) => {
//       res.json({
//         success: 1
//       })
//     })
//   })
// })
// // 主页商品信息的显示
// router.get('/mainpage', (req, res) => {
//     let limit = req.query.pagesize || 10 // 分页参数
//     let currentPage = req.query.page || 1 // 当前页码
//     goods.find({}, function (err, ress) {
//         if (err) {
//           return res.json({
//             success: 0
//           })
//         }
//         let all = ress.length
//         goods.find({}).sort({
//           'subTime': -1
//         }).skip((parseInt(currentPage) - 1) * parseInt(limit)).limit(parseInt(limit)).exec(function (err, docs) {
//           if (err) {
//             return res.json({
//               success: 0
//             })
//           }
//       let hasMore = (currentPage * limit) < all ? true : false
//       return res.json({
//         success: 1,
//         hasMore: hasMore,
//         hlist: docs
//       })
//         })
//       })
//     })

// module.exports = router
