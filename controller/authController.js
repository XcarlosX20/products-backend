const Companies = require('../model/Companies')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { checkToken } = require('../middleware/resetPassword')
const { FRONTEND_URL } = require('../config/variables')
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
    const user = await Companies.findById(req.company.id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}
//Reset password
exports.sendToken = async (req, res) => {
  const company = await Companies.findOne({ companyEmail: req.body.email })
  if (!company) {
    return res.status(400).json({
      msg: `This account does not exist`,
      type: 'error',
    })
  }
  const token = jwt.sign({ email: company.companyEmail }, process.env.SECRET, {
    expiresIn: 3600,
  })
  company.tokenResetPass = token
  const link = `${FRONTEND_URL}/reset-password/${token}`
  console.log(link)
  company.save()
  res.status(200).json({
    msg: `Enter your email address to send a password reset link ${company.companyEmail}`,
    type: 'success',
  })
}
exports.checkToken = async (req, res) => {
  const token = req.params.token
  try {
    const [accountToChange] = await Companies.where('tokenResetPass', token)
    if (checkToken({ token }) === false || accountToChange === undefined) {
      return res
        .status(401)
        .json({ msg: 'invalid token', checked: false, type: 'error' })
    }
    res.status(200).json({
      msg: 'token verified successfully',
      checked: true,
      type: 'success',
    })
  } catch (error) {
    console.log(error)
  }
}
exports.setNewPassword = async (req, res) => {
  const { token } = req.params
  const { newPassword } = req.body
  try {
    const [accountToChange] = await Companies.where('tokenResetPass', token)
    if (checkToken({ token }) === false || accountToChange === undefined) {
      return res
        .status(401)
        .json({ msg: 'invalid token', checked: false, type: 'error' })
    }
    const salt = await bcrypt.genSalt(10)
    accountToChange.password = await bcrypt.hash(newPassword, salt)
    accountToChange.tokenResetPass = undefined
    await accountToChange.save()
    res
      .status(200)
      .json({ msg: 'the password has been changed', type: 'success' })
  } catch (error) {
    console.log(error)
  }
}
