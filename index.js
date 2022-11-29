const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')
if (process.env.NODE_ENV !== 'production') {
  var delay = require('express-delay')
  app.use(delay(500, 2000))
}
connectDB()
const socket = require('./socket/')
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes
app.set('port', process.env.PORT || 4000)

app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/requests', require('./routes/requests'))
app.use('/api/summary', require('./routes/summary'))
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
