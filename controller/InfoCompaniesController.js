const InfoCompanies = require('../model/InfoCompanies')
const Company = require('../model/Companies')
const Products = require('../model/Products')
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
exports.addCategory = async (req, res) => {
  const company = req.company.id
  const { category } = req.body
  try {
    const infoCompany = await InfoCompanies.findOne({ company })
    infoCompany.categories = [...infoCompany.categories, category.toLowerCase()]
    await infoCompany.save()
    res.status(200).json({ msg: 'added', category })
  } catch (error) {
    console.log(error)
  }
}
exports.deleteCategory = async (req, res) => {
  const company = req.company.id
  const { category } = req.params
  try {
    const infoCompany = await InfoCompanies.findOne({ company })
    infoCompany.categories = infoCompany.categories.filter(
      (i) => i !== category
    )
    //deleteCategoriesAtproducts
    const products = await Products.updateMany(
      { company, category: category },
      { category: '' }
    )
    await infoCompany.save()
    res.send('deleted')
  } catch (error) {
    console.log(error)
  }
}
exports.getCategories = async (req, res) => {
  const { idCompany } = req.params
  const { q } = req.query
  try {
    const infoCompany = await InfoCompanies.findOne({ company: idCompany })
    const company = await Company.findById(idCompany)
    if (!infoCompany || !company.companyName) {
      return res.status(404).json({ msg: 'not found' })
    }
    if (q === 'all') {
      return res
        .status(200)
        .json({ companyName: company.companyName, ...infoCompany._doc })
    }
    return res
      .status(200)
      .json({ companyName: company.companyName, [q]: infoCompany[q] })
  } catch (error) {
    console.log(error)
  }
}
