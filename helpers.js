exports.decreaseDaysToDate = ({anyDate, days}) => {
    let date = anyDate || Date.now()
    let res = new Date(date)
    res.setDate(res.getDate() - days)
    return res
  }
exports.calculeRevenues = ({arr}) => {
    let total = 0
    arr.forEach((element) => {
      let amountOrder = element.amount
      total += amountOrder
    })
    return total
}