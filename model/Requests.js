const mongoose = require('mongoose')
const RequestsSchema = mongoose.Schema(
  {
    dataBuyer: {
      type: Object,
      require: true,
      trim: true,
    },
    amount: {
      type: Number,
      require: true
    },
    description: {
      type: String,
      require: false,
      trim: true
    },
    bag : {
      type: Array,
      require: true
    },
    number_proof_payment : {
      type: String,
      require: true
    },
    img_proof_payment : {
      type: String,
      require: true
    },
    state : {
      type: Boolean,
      default: false
    },
    pendingDelete:{
      type: Boolean,
      require: false
    },
    date:{
      type: Date,
      require: true
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies'
    }
  },
  { versionKey: false }
)
module.exports = mongoose.model('Requests', RequestsSchema)