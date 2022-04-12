const { changeDate } = require('../helpers');
const Companies = require('../model/Companies');
//require('dotenv').config({ path: '.env' })

const setDateRange = async (req, res, next) => {
 try {
  const company = req.company.id;
  let companyData = await Companies.findById(company);
  let newDate = changeDate({dateRef: companyData.dateRef})
  if(newDate){
    companyData.dateRef = newDate
    await Companies.findByIdAndUpdate(company, companyData)
  }
  console.log(newDate)
   next()
 } catch (error) {
   console.log(error)
 }
}
module.exports = setDateRange;
