const mongoose = require('mongoose')
const CompaniesSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    companyEmail: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    img: {
      type: String,
      require: false,
      trim: true,
    },
    dateRef: {
      type: Date,
      default: Date.now(),
    },
    tokenResetPass: {
      type: String,
    },
    tokenExp: {
      type: Date,
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('Companies', CompaniesSchema)
