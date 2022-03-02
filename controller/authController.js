const Companies = require('../model/Companies')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.authCompany = async (req, res) => {
  const { companyEmail, password } = req.body
  try {
    let company = await Companies.findOne({ companyEmail })
    if (!company) {
      return res.status(400).json({ msg: 'This user does not exist' })
    }
    const passCorrect = await bcrypt.compare(password, company.password)
    if (!passCorrect) {
      return res.status(400).json({ msg: 'Password Incorrect' })
    }
    //JWT
    const payload = {
      company: {
        id: company.id,
      },
    }
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 86400, // 24 hours
      },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}
exports.getCompany = async (req, res) => {
  try {
    const user = await Companies.findById(req.company.id).select('-password');
    res.status(200).json(user);
} catch (error) {
    console.log(error);
    res.status(500).json({msg: 'There was an error'});
}
}