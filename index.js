const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const connectDB = require('./config/db')
const socket = require('./socket/')
if (process.env.NODE_ENV !== 'production') {
  var delay = require('express-delay')
  app.use(delay(500, 2000))
}
connectDB()
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
app.get('/new-notification', async (req, res) => {
  const api = await fetch('http://localhost:4002/')
  const response = await api.text()
  console.log(response)
  res.send('aaa')
})
app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/requests', require('./routes/requests'))
app.use('/api/summary', require('./routes/summary'))

const corsOptionsSocket = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
const io = socketIo(server, {
  cors: corsOptionsSocket,
  allowEI03: true,
})
socket(io)
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
module.exports = { socket: io }
