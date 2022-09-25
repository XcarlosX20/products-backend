const Company = require('../model/Companies')
const InfoCompanies = require('../model/InfoCompanies')
const bcrypt = require('bcrypt')
exports.addCompany = async (req, res) => {
  const { companyEmail, password } = req.body
  try {
    let company = await Company.findOne({ companyEmail })
    if (company) {
      res.status(400).json({ msg: 'This user already exists' })
    } else {
      company = new Company(req.body)
      const salt = await bcrypt.genSalt(10)
      company.password = await bcrypt.hash(password, salt)
      const newInfo = new InfoCompanies({ company: company.id })
      await newInfo.save()
      await company.save()
      res.send('recibed')
    }
  } catch (error) {
    console.log(error)
  }
}
