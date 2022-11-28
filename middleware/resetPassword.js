const jwt = require('jsonwebtoken')
exports.checkToken = ({ token }) => {
  try {
    const cifrated = jwt.verify(token, process.env.SECRET)
    return cifrated
  } catch (error) {
    return false
  }
}
