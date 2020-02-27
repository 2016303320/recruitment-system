const superagent = require('superagent')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const admin = [
  {
    schoolNum: '2016608881',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608882',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608883',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608884',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608885',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608886',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608887',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608888',
    schoolPwd: '888888yh'
  },
  {
    schoolNum: '2016608889',
    schoolPwd: '888888yh'
  }
]
function isNpu (schoolNum, schoolPwd) {
  return new Promise((resolve, reject) => {
    admin.forEach((item, index) => {
      if ((item.schoolNum === schoolNum) && (item.schoolPwd === schoolPwd)) {
        return resolve(`测试账号${index}号`)
      }
    })
    superagent
      .post('http://us.nwpu.edu.cn/eams/login.action')
      .send(`username=${schoolNum}&password=${schoolPwd}&encodedPassword=&session_locale=zh_CN`)
      .end((err, response) => {
        err && reject(err)
        // 在服务端操作DOM 取得用户名，若能拿到用户名则翱翔门户验证成功
        const dom = new JSDOM(response.text)
        const nameDom = dom.window.document.querySelector('.person_title_1')
        if (nameDom) {
          const nameFromNpu = nameDom.textContent
          console.log(nameFromNpu)
          resolve(nameFromNpu)
        } else {
          reject(new Error())
        }
      })
  })
}
module.exports = isNpu
