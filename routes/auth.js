const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
router.post('/company', authController.authCompany)
router.get('/company', auth, authController.getCompany)
module.exports = router
