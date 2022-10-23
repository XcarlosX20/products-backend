const socket = require('../socket')
const Notifications = require('../model/notifications')

exports.newNotification = async (req, res) => {
  // pasar el id de cada company
  if (req.newNotification) {
    const newNotification = new Notifications({
      ...req.newNotification,
      readed: false,
    })
    socket.emit(`notifications:${newNotification.company}`, newNotification)
    await newNotification.save()
    //send email to Company
  }
}
