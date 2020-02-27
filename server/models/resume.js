const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResumeSchema = new Schema({
  infId: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  date: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  male: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  mail: {
    type: String
  },
  nativePlace: {
    type: String
  },
  address: {
    type: String
  },
  applyForCity: {
    type: String
  },
  salary: {
    type: String
  },
  remark: {
    type: String
  },
  resumeUrl: {
    type: String
  }
})

module.exports = mongoose.model('resume', ResumeSchema)
