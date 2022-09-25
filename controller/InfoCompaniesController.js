const InfoCompanies = require('../model/InfoCompanies')

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
  //const { property } = req.params
  const company = req.company.id
  const payload = req.body.data
  const properties = Object.values(req.query)
  try {
    const infoCompany = await InfoCompanies.findOne({ company })
    //company
    properties.forEach((property) => {
      infoCompany[property] = payload[property]
    })
    await infoCompany.save()
    res.status(201).json({ msg: 'successfully upgraded' })
    //console.log(payload, properties)
  } catch (error) {
    console.log(error)
  }
}
