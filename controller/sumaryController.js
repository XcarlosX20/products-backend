const { getDateRange, calculeRevenues } = require('../helpers')
const Companies = require('../model/Companies')
const Requests = require('../model/Requests')
const Summaries = require('../model/Summaries')
exports.getSumaryCompany = async (req, res) => {
  const { newSummaryMonth, newDateCompany } = req
  console.log(newSummaryMonth, newDateCompany)
  const company = req.company.id
  const { daysRange } = req.query
  try {
    const requests = await Requests.find({ company }).sort({ date: -1 })
    const { dateRef } = await Companies.findById(company)
    const startDate = getDateRange({ days: daysRange, dateRef })
    const filterByMonthAgo = () => {
      return requests.filter((results) => results.date >= startDate)
    }
    const requestLastMonth = filterByMonthAgo()
    const earnings = calculeRevenues({ arr: requestLastMonth })
    if (newDateCompany !== false) {
      console.log('aa')
      const data = {
        ...newSummaryMonth,
        amount: earnings,
        salesAmount: requestLastMonth.length,
        fee: earnings * 0.02,
      }
      const newSummary = new Summaries(data)
      await newSummary.save()
      let companyData = await Companies.findById(company)
      companyData.dateRef = newDateCompany
      await Companies.findByIdAndUpdate(company, companyData)
    }
    res.status(200).json({ earnings, orderLength: requestLastMonth.length })
  } catch (error) {
    console.log(error)
  }
}
