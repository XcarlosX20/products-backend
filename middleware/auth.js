const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  //console.log(token)
  if (!token) {
    return res.status(401).json({ msg: 'token is missing' })
  }
  try {
    const cifrated = jwt.verify(token, process.env.SECRET)
    req.company = cifrated.company
    next()
  } catch (error) {
    res.status(401).json({ msg: 'invalid token' })
  }
}
