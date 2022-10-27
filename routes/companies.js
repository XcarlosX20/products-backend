const express = require('express')
const router = express.Router()
const companiesController = require('../controller/companiesController')
const InfoCompaniesController = require('../controller/InfoCompaniesController')
const { getNotifications } = require('../controller/notificationController')
const auth = require('../middleware/auth')
router.post('/', companiesController.addCompany)
//router.post('/info', auth, InfoCompaniesController.addInfoCompany)
router.get('/notifications/', auth, getNotifications)
router.put('/info/', auth, InfoCompaniesController.editInfoCompany)
router.get('/info', auth, InfoCompaniesController.getInfoCompany)
router.post('/info/categories/', auth, InfoCompaniesController.addCategory)
router.delete(
  '/info/categories/:category',
  auth,
  InfoCompaniesController.deleteCategory
)
//Ecommerce
router.get('/:idCompany', InfoCompaniesController.getCategories)
module.exports = router
