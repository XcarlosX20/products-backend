const { changeDate, calculeRevenues } = require('../helpers')
const Companies = require('../model/Companies')
const Summaries = require('../model/Summaries')
const Requests = require('../model/Requests')
const moment = require('moment')
//require('dotenv').config({ path: '.env' })

const setDateRange = async (req, res, next) => {
  try {
    const company = req.company.id
    let companyData = await Companies.findById(company)
    let { change } = changeDate({ dateRef: companyData.dateRef })
    if (change) {
      const requests = await Requests.find({ company }).sort({ date: -1 })
      const startDate = new Date(
        moment(companyData.dateRef).subtract(1, 'month')
      )
      const filterByMonthAgo = () => {
        return requests.filter((results) => results.date >= startDate)
      }
      const requestLastMonth = filterByMonthAgo()
      const amount = calculeRevenues({ arr: requestLastMonth })
      const data = {
        startDate,
        endDate: companyData.dateRef,
        company,
        amount,
        salesAmount: requestLastMonth.length,
        fee: amount * 0.02,
      }
      const newSummary = new Summaries(data)
      await newSummary.save()
      companyData.dateRef = change
      await Companies.findByIdAndUpdate(company, companyData)
    }
    next()
  } catch (error) {
    console.log(error)
  }
}
module.exports = setDateRange
