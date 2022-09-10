const mongoose = require('mongoose')
const CompaniesSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies',
    },
    description: {
      type: String,
      require: false,
    },
    categories: {
      type: [String],
      require: false,
    },
    workdays: {
      type: [String],
      default: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      require: true,
    },
    workTime: {
      type: [String],
      default: ['08:00', '21:00'],
      require: true,
    },
    employees: [
      {
        name: String,
        role: String,
        socialMedia: Object,
      },
    ],
  },
  { versionKey: false }
)
module.exports = mongoose.model('InfoCompanies', CompaniesSchema)
