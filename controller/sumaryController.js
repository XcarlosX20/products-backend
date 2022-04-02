const { decreaseDaysToDate, calculeRevenues } = require('../helpers')
const Requests = require('../model/Requests')
exports.getSumaryCompany = async (req, res) => {
  const company = req.company.id
  const { daysRange } = req.query
  const timeAgo = decreaseDaysToDate({ days: daysRange })
  try {
    const requests = await Requests.find({ company }).sort({ date: -1 })
    if (daysRange) {
      const filterByMonthAgo = () => {
        return requests.filter((results) => results.date > timeAgo)
      }
      const requestLastMonth = filterByMonthAgo()
      const earnings = calculeRevenues({ arr: requestLastMonth })
      res.status(200).json({ earnings, orderLength: requestLastMonth.length })
    }
    const earnings = calculeRevenues({arr: requests});
    res.status(200).json({ earnings, orderLength: requests.length })
  } catch (error) {
    console.log(error)
  }
}