const { editNotification } = require('./utils/NotificationsSocket')
const socket = (io) => {
  io.on('connection', (socket) => {
    socket.on(`notification:edit`, async (notification, cb) => {
      let edited = await editNotification({ notification })
      cb(edited)
    })
  })
}
module.exports = socket
