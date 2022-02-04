const express = require('express')
const router = express.Router()
const companiesController = require('../controller/companiesController')
router.post('/', companiesController.addCompany)
module.exports = router
