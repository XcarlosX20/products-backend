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
  try {
    const infoCompany = await InfoCompanies.findOne({ company })
    res.status(200).json(infoCompany)
  } catch (error) {
    console.log(error)
  }
}
exports.editInfoCompany = async (req, res) => {
  const company = req.company.id
  try {
    const editCompanyInfo = await InfoCompanies.findOneAndUpdate(
      company,
      req.body
    )
    if (!editCompanyInfo) res.status(404).json({ msg: 'there was an error' })
    res.status(201).json({ msg: 'successfully upgraded' })
  } catch (error) {
    console.log(error)
  }
}
