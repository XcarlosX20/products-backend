const mongoose = require('mongoose')
const NotificationSchema = mongoose.Schema(
  {
    body: {
      type: Object,
      require: true,
    },
    type: {
      type: String,
      require: true,
      trim: true,
    },
    title: {
      type: String,
      require: true,
    },
    readed: {
      type: Boolean,
      require: false,
    },
    date: {
      type: Date,
      require: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Companies',
    },
    idDoc: {
      type: mongoose.Types.ObjectId,
    },
  },
  { versionKey: false }
)
module.exports = mongoose.model('Notifications', NotificationSchema)
