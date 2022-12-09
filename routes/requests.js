const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const checkSchedule = require('../middleware/companyIsOpen')
const requestsController = require('../controller/requestsController')
const { newNotification } = require('../controller/notificationController')
//from company app
router.get('/', auth, requestsController.getRequest)
router.put('/:id', auth, requestsController.editRequest)
//from ecommerce
router.post(
  '/companies/:idCompany',
  requestsController.addRequest,
  newNotification
)

module.exports = router
