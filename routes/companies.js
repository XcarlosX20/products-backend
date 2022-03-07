const express = require('express')
const router = express.Router()
const companiesController = require('../controller/companiesController')
const auth = require('../middleware/auth')
router.post('/', companiesController.addCompany)
router.put('/', auth, companiesController.editCompanyCategories)
module.exports = router
