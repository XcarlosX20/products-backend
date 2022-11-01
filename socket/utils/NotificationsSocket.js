const Notifications = require('../../model/Notifications')
exports.editNotification = async ({ notification, changes }) => {
  // pasar el id de cada company
  let edit
  if (!changes) {
    edit = await Notifications.findByIdAndUpdate(notification._id, {
      readed: true,
    })
  }
  edit = await Notifications.findByIdAndUpdate(notification._id, changes)
  return edit
}
