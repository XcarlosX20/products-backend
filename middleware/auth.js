const jws = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  //console.log(token)
  if (!token) {
    res.status(401).json({ msg: "token is missing" })
  }
  try {
    const cifrated = jws.verify(token, process.env.SECRET)
    req.company = cifrated.company
    next()
  } catch (error) {
    res.status(401).json({ msg: 'invalid token' })
  }
}
