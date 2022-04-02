const express = require('express')
const summaryController = require('../controller/sumaryController')
const auth = require('../middleware/auth')
const router = express.Router()
router.get('/', auth, summaryController.getSumaryCompany)
module.exports = router