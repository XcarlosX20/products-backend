const socket = require('../socket')
const Notifications = require('../model/Notifications')
const InfoCompanies = require('../model/InfoCompanies')
exports.newNotification = async (req, res) => {
  // pasar el id de cada company
  if (req.newNotification) {
    const newNotification = new Notifications({
      ...req.newNotification,
      readed: false,
    })
    socket.emit(`notifications:${newNotification.company}`, newNotification)
    await newNotification.save()
    await InfoCompanies.findOneAndUpdate(
      { company: newNotification.company },
      { alertNotification: true }
    )
    //send email to Company
  }
}
exports.getNotifications = async (req, res) => {
  // pasar el id de cada company
  const company = req.company.id
  try {
    await InfoCompanies.findOneAndUpdate(
      { company },
      { alertNotification: false }
    )
    const notifications = await Notifications.find({ company })
      .sort({ date: 1 })
      .limit(30)

    //console.log(notifications)
    res.json(notifications)
  } catch (error) {
    console.log(error)
  }
}
