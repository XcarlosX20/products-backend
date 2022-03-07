const Company = require('../model/Companies')
const bcrypt = require('bcrypt')
exports.addCompany = async (req, res) => {
  const { companyEmail, password } = req.body

  let company = await Company.findOne({ companyEmail })
  if (company) {
    res.status(400).json({ msg: 'This user already exists' })
  } else {
    company = new Companie(req.body)
    const salt = await bcrypt.genSalt(10)
    company.password = await bcrypt.hash(password, salt)
    await company.save()
    res.send('recibed')
  }
}
exports.editCompanyCategories = async (req, res) => {
  try {
    const company = req.company.id;
    const setCompany = await Company.findByIdAndUpdate(company, {categories: req.body.categories}).select('-password')
    if(setCompany){
      res.status(200).json(setCompany)
    }
  } catch (error) {
    console.log(error)
  }
}