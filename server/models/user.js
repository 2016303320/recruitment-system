const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  schoolNum: {
    type: String,
    required: true
  },
  schoolPwd: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  phoneNum: {
    type: String
  },
  qqNum: {
    type: String
  },
  wxid: {
    type: String
  },
  avatar: {
    type: String
  },
  collects:[]
})

module.exports = mongoose.model('users', UserSchema)
