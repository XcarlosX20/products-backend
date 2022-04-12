const moment = require('moment');
const format = 'Do MMMM YYYY'
exports.getDateRange = ({ dateRef, days }) => {
  let date = dateRef
  let res = new Date(date)
  res.setDate(res.getDate() - Number(days || 30))
  console.log(dateRef, res)
  return res
}
exports.calculeRevenues = ({ arr }) => {
  let total = 0
  arr.forEach((element) => {
    let amountOrder = element.amount
    total += amountOrder
  })
  return total
}
exports.productsAlphabet = (arr) => {
  return arr.sort((a, b) => {
    let productnameA = a.productname.toLowerCase()
    let productnameB = b.productname.toLowerCase()

    if (productnameA < productnameB) {
      return -1
    }
    if (productnameB > productnameA) {
      return 1
    } else {
      return 0
    }
  })
}
exports.changeDate = ({ dateRef }) => {
  let today = moment()
  let fechaLimite = moment(dateRef);
  let diff = today.clone().diff(fechaLimite, 'month');
  if(today >= fechaLimite){
    let res = fechaLimite.add(1, 'month')
    if (diff > 0 ) {
      let res = fechaLimite.add(diff, 'month')
      return new Date(res)
    }
    return new Date(res)
  }
  return false
}
