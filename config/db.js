const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const conectarDB = async () => {
  try {
    await mongoose.connect(
     "mongodb+srv://carlos:carlos123@cluster0.7j2xq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Cluster0", clientOptions
    )
    console.log('DB connected', process.env.DB_URL,  process.env.NODE_ENV)
  } catch (error) {
    console.log(error)
  }
}

module.exports = conectarDB
