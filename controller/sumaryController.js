const moment = require('moment')
const { calculeRevenues } = require('../helpers')
const Companies = require('../model/Companies')
const Requests = require('../model/Requests')
const Summaries = require('../model/Summaries')
exports.getSumaryCompany = async (req, res) => {
  const company = req.company.id
  const { daysRange } = req.query
  try {
    const { dateRef } = await Companies.findById(company)
    const startDate = moment(dateRef).subtract(1, 'month')
    const requests = await Requests.find({
      company: company,
      date: { $gte: startDate, $lte: dateRef },
    })
    const earnings = calculeRevenues({ arr: requests })
    res.status(200).json({
      earnings,
      orderLength: requests.length,
      timeRange: { startDate, endDate: dateRef },
    })
  } catch (error) {
    console.log(error)
  }
}
exports.getSumaryHistory = async (req, res) => {
  const company = req.company.id
  try {
    const histories = await Summaries.find({ company }).sort({ date: -1 })
    res.status(200).json(histories)
  } catch (error) {
    console.log(error)
  }
}
