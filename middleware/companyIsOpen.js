const InfoCompanies = require('../model/InfoCompanies')
const moment = require('moment')
module.exports = async (req, res, next) => {
  const company = req.params.idCompany
  try {
    const { workdays, workTime } = await InfoCompanies.findOne({ company })
    const dayToday = moment().format('dddd')
    const getCurrentHour = moment().hour('HH:mm')
    let startDate = moment(workTime[0], 'HH:mm')
    let endDate = moment(workTime[1], 'HH:mm')
    let checkHours = moment(getCurrentHour).isBetween(startDate, endDate)
    if (workdays.indexOf(dayToday) >= 0 && checkHours) {
      next()
    } else {
      res.status(400).json({ msg: 'this company is closed' })
    }
  } catch (error) {
    console.log(error)
  }
}
