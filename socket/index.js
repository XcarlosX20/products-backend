const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const { editNotification } = require('./utils/NotificationsSocket')
const io = socketIo(server, {
  cors: {
    origin: 'https://dastore.vercel.app/',
    optionSuccessStatus: 200,
  },
  credentials: true,
})
app.get('/', (req, res) => res.send('Hello Socket!'))
const { SOCKET_PORT = 0 } = process.env
io.on('connection', (socket) => {
  socket.on(`notification:edit`, async (notification, cb) => {
    let edited = await editNotification({ notification })
    cb(edited)
  })
})
server.listen(SOCKET_PORT, () => {
  console.log(`socket on port ${server.address().port}`)
})
module.exports = io
