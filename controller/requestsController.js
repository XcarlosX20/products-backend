const Companies = require('../model/Companies')
const Requests = require('../model/Requests')
//Admin dev
exports.getRequestAdmin = async (req, res) => {
  try {
    const orders = await Requests.find({ paid: false })
      .sort({ date: 1 })
      .limit(400)
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
}
//custom Companies
exports.getRequest = async (req, res) => {
  const company = req.company.id
  try {
    const orders = await Requests.find({ company, paid: true }).sort({
      state: 1,
      date: 1,
    })
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
}
exports.editRequest = async (req, res) => {
  const { id } = req.params
  try {
    const request = await Requests.findByIdAndUpdate(id, req.body)
    res.status(200).json(request)
  } catch (error) {
    console.log(error)
  }
}
//Ecommerce
exports.addRequest = async (req, res, next) => {
  try {
    const company = await Companies.findById(req.params.idCompany)
    const request = req.body
    request.company = company._id
    request.state = false
    request.paid = false
    const newOrder = new Requests(request)
    await newOrder.save()
    req.newNotification = {
      company: company._id,
      body: request.dataBuyer,
      type: 'requests',
      sendEmail: company.companyEmail,
      date: request.date,
      idDoc: newOrder._id,
    }
    res.send('send')
    next()
  } catch (error) {
    console.log(error)
  }
}
