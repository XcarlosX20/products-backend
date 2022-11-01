const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const { editNotification } = require('./utils/NotificationsSocket')
const io = socketIo(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000',
    methods: ['websocket'],
  },
})
app.get('/', (req, res) => response.send('Hello Socket!'))
const PORT = process.env.SOCKET_PORT || 4001
io.on('connection', (socket) => {
  socket.on(`notification:edit`, async (notification, cb) => {
    let edited = await editNotification({ notification })
    cb(edited)
  })
})
server.listen(PORT, () => {
  console.log(`socket on port ${PORT}`)
})
module.exports = io
