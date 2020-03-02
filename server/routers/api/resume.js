const express = require('express')
const router = express.Router()
const Resume = require('../../models/resume')
const information = require('../../models/recruitmentInf')

const qiniu = require('qiniu')// 客户端调用接口，生成token
let accessKey = 'ntlsBGblfBg0-QqW8gVnN7AZ97laPDIE0T9aNxAD'
let secretKey = 'QyOL1TJb3C2BuToX4li6OdVQgNGHjzUvIdZo54vJ'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
let options = {
  scope: 'recruitmentsystem' // 七牛资源目录
}

router.get('/token', (req, res) => {
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)
  var data = {
    'token': uploadToken
  }
  res.json(data)
})

router.post('/login', (req, res) => {

  const { userName, userPwd } = req.body
  if(userName === 'admin' && userPwd === '123456Abc') {
    res.json({
      success: 1,
      sessionData: 'jkjasdkfjksadf'
    })
  }else {
    res.json({
      success: 0,
      sessionData: ''
    })
  }

})

// router.get('/getA', (req, res) => {
//   information.find().then(inf => {
//     res.json({
//       inf
//     })
//   })
// })
router.post('/submitResume', (req, res) => {
  const resume = new Resume({
    ...req.body
  })
  resume.save().then(() => {
    res.json({
      success: 1
    })
  })
})
router.get('/getAllInf', (req, res) => {
  information.find().then(inf => {
    res.json({
      inf
    })
  })
})

router.post('/getInfById', (req, res) => {
  const { _id } = req.body
  information.findById({_id}).then(inf => {
    res.json({
      inf
    })
  })
})

router.post('/submitInf',(req, res) => {
  const inf = new information({
    date: req.body.date,
    name: req.body.name,
    desc: req.body.desc
  })
  inf.save().then((newInf) => {
    res.json({
      success: 1,
      _id: newInf._id
    })
  }).catch((err) => {
    res.json({
      success: err
    })
  })
})
router.post('/updateInf', (req, res) => {
  const { _id } = req.body
  console.log(req.body)
  information.findByIdAndUpdate({ _id }, req.body).then(() => {
    res.json({
      success: 1
    })
  })
})

router.post('/deleteInf', (req, res) => {
  const { _id } = req.body
  information.deleteOne({ _id }).then(() => {
    res.json({
      success: 1
    })
  })
})

router.get('/getAllResume', (req, res) => {
  Resume.find().then(resumes => {
    res.json({
      resumes
    })
  })
})

router.get('/getAllResume', (req, res) => {
  Resume.find().then(resumes => {
    res.json({
      resumes
    })
  })
})

router.post('/deleteResume', (req, res) => {
  const { _id } = req.body
  Resume.deleteOne({ _id }).then(() => {
    res.json({
      success: 1
    })
  })
})

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

module.exports = router
