const InfoCompanies = require('../model/InfoCompanies')

exports.addInfoCompany = async (req, res) => {
  const company = req.company.id
  const newCompany = new InfoCompanies({
    company,
    categories: ['food', 'farmacy', 'other'],
    workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    employees: [
      {
        name: 'Jonh Doe',
        role: 'CEO',
        socialMedia: { instagram: 'carlsasj', twitter: 'carlsasj' },
      },
    ],
  })
  await newCompany.save()
  res.json(newCompany)
}
exports.getInfoCompany = async (req, res) => {
  const company = req.company.id
  const infoCompany = await InfoCompanies.findOne({ company })
  res.status(200).json(infoCompany)
}
exports.editInfoCompany = async (req, res) => {
  const company = req.company.id
  const editCompany = await InfoCompanies.findByIdAndUpdate(company, req.body)
}
