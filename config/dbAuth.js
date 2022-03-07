const mongoose = require('mongoose')
//require('dotenv').config({ path: '.env' })

const connectDBAuth = async (url) => {
  try {
    await mongoose.connect(url)
    console.log('DB2 connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDBAuth
