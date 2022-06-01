const express = require('express')
const summaryController = require('../controller/sumaryController')
const auth = require('../middleware/auth')
const setDateRange = require('../middleware/setDateRange')
const router = express.Router()
router.get('/', auth, setDateRange, summaryController.getSumaryCompany)
module.exports = router
