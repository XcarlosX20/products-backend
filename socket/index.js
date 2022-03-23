/* eslint-disable node/no-missing-require */
/* eslint-disable security-node/detect-crlf */
const app = require('express')()
const cors = require('cors')
app.use(cors())
const httpServer = require('http').createServer(app)
app.get('/', (_request, response) => response.send('Hello Socket!'))
const socketClient = require('socket.io-client')('http://localhost:1024/')
socketClient.open()
const io = require('socket.io')(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  allowEIO3: true,
})
io.sockets.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('notifications:join', (room) => {
    socket.join(room)
  })
  socket.on('notifications:send', (request) => {
    socket.to('notifications:join').emit(request.nameMessage, {
      data: request.data,
      message: 'have new notification',
    })
  })
})
httpServer.listen(1024, () => {
  console.log(`Socket up on port: ${1024}`)
})
module.exports = socketClient
