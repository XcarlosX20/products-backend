const mongoose = require('mongoose')
const SummariesSchema = mongoose.Schema(
  {
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    salesAmount: {
      type: Number,
      require: true,
      trim: true,
    },
    amount: {
      type: String,
      require: true,
      trim: true,
    },
    fee: {
      type: String,
      require: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies',
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('Summaries', SummariesSchema)
