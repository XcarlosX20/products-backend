const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
router.post('/company', authController.authCompany)
router.get('/company', auth, authController.getCompany)
//reset password
router.post('/reset-password/', authController.sendToken)
router.get('/reset-password/:token', authController.checkToken)
router.post('/reset-password/:token', authController.setNewPassword)
module.exports = router
