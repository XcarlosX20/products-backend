const express = require('express')
const router = express.Router()
const companiesController = require('../controller/companiesController')
const InfoCompaniesController = require('../controller/InfoCompaniesController')
const auth = require('../middleware/auth')
router.post('/', companiesController.addCompany)
//router.post('/info', auth, InfoCompaniesController.addInfoCompany)
router.put('/info/', auth, InfoCompaniesController.editInfoCompany)
router.get('/info', auth, InfoCompaniesController.getInfoCompany)
//Ecommerce
router.get('/:idCompany', InfoCompaniesController.getCategories)
module.exports = router
