const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })
const conectarDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === 'production'
        ? process.env.DB_URL
        : process.env.DB_LOCAL
    )
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = conectarDB
