const mongoose = require('mongoose')
const CompaniesSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies',
    },
    description: {
      type: String,
      require: true,
      default: '',
    },
    categories: {
      type: [String],
      require: true,
      default: [],
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
      type: Object,
      default: { startTime: '8:00', endTime: '21:00' },
      require: true,
    },
    employees: [
      {
        name: String,
        role: String,
        socialMedia: Object,
      },
    ],
    location: {
      type: Object,
      require: false,
    },
    alertNotification: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('InfoCompanies', CompaniesSchema)
