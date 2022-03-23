const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: '.env' })
const connectDB = require('./config/db')

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes
app.set('port', process.env.PORT || 4000)

app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/requests', require('./routes/requests'))


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});