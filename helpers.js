exports.getDateRange = ({dateRef, days}) => {
    let date = dateRef || Date.now()
    let res = new Date(date)
    res.setDate(res.getDate() + Number(days))
    console.log(dateRef, res)
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