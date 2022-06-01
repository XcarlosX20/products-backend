const moment = require('moment')
const { calculeRevenues } = require('../helpers')
const Companies = require('../model/Companies')
const Requests = require('../model/Requests')
exports.getSumaryCompany = async (req, res) => {
  const company = req.company.id
  const { daysRange } = req.query
  try {
    const requests = await Requests.find({ company }).sort({ date: -1 })
    const { dateRef } = await Companies.findById(company)
    const startDate = new Date(moment(dateRef).subtract(1, 'month'))
    const filterByMonthAgo = () => {
      return requests.filter((results) => results.date >= startDate)
    }
    const requestLastMonth = filterByMonthAgo()
    const earnings = calculeRevenues({ arr: requestLastMonth })
    res.status(200).json({ earnings, orderLength: requestLastMonth.length })
  } catch (error) {
    console.log(error)
  }
}
