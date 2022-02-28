const mongoose = require('mongoose')
const ProductsSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      default: false,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    img: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: false,
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('Products', ProductsSchema)
