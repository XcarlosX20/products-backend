const { changeDate, getDateRange } = require('../helpers')
const Companies = require('../model/Companies')
//require('dotenv').config({ path: '.env' })

const setDateRange = async (req, res, next) => {
  try {
    const company = req.company.id
    let companyData = await Companies.findById(company)
    let { change, diff } = changeDate({ dateRef: companyData.dateRef })
    const newSummary = {
      startDate: getDateRange({ days: 30, dateRef: companyData.dateRef }),
      endDate: diff ? change : companyData.dateRef,
      company,
    }
    console.log(diff)
    req.newSummaryMonth = newSummary
    req.newDateCompany = change
    next()
  } catch (error) {
    console.log(error)
  }
}
module.exports = setDateRange
