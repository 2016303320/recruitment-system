const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecruitmentInf = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: String
  }
})

module.exports = mongoose.model('information', RecruitmentInf)
