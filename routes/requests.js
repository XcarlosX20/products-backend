const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const checkSchedule = require('../middleware/companyIsOpen')
const requestsController = require('../controller/requestsController')
//from company app
router.get('/', auth, requestsController.getRequest)
router.get('/:daysRange', auth, requestsController.getRequestInDays)
router.put('/:id', auth, requestsController.editRequest)
//from ecommerce
router.post(
  '/companies/:idCompany',
  checkSchedule,
  requestsController.addRequest
)

module.exports = router
