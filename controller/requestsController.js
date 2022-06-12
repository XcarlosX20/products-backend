const { getDateRange } = require('../helpers')
const Companies = require('../model/Companies')
const Requests = require('../model/Requests')

exports.getRequest = async (req, res) => {
  const company = req.company.id
  try {
    const orders = await Requests.find({ company }).sort({ state: 1, date: -1 })
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
}
exports.addRequest = async (req, res) => {
  const company = await Companies.findById(req.params.idCompany)
  if (company) {
    const request = req.body
    request.company = req.params.idCompany
    const newOrder = new Requests(request)
    await newOrder.save()
    res.send('send')
  } else {
    res.status(404).json({ msg: 'company not found' })
  }
}
exports.editRequest = async (req, res) => {
  //const request = await Requests.findById(req.params.id);
  const { id } = req.params
  const request = await Requests.findByIdAndUpdate(id, req.body)
  res.status(200).json(request)
}
exports.getRequestInDays = async (req, res) => {
  const company = req.company.id
  const { daysRange } = req.params
  try {
    const { dateRef } = await Companies.findById(company)
    const requests = await Requests.find({ company }).sort({ date: -1 })
    const timeLimit = getDateRange({ dateRef, days: daysRange })
    const filterByMonthAgo = () => {
      return requests.filter((results) => results.date >= timeLimit)
    }
    const requestLastMonth = filterByMonthAgo()
    res.status(200).json({ requestLastMonth })
  } catch (error) {
    console.log(error)
  }
}
