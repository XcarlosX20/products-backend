const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: '.env' })
const connectDB = require('./config/db')
connectDB()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes
app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.listen(PORT, () => {
  console.log('listen on port ' + PORT)
})
