const mongoose = require('mongoose')
const CompaniesSchema = mongoose.Schema(
  {
    companieName: {
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
    description: {
      type: String,
      require: false,
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('Companies', CompaniesSchema)
