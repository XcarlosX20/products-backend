const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requestsController = require('../controller/requestsController')
const { getDateRange } = require('../helpers')
//from company app
router.get('/', auth, requestsController.getRequest)
router.get('/:daysRange', auth, getDateRange, requestsController.getRequestInDays)
router.put('/:id', auth, requestsController.editRequest)
//from ecommerce
router.post('/company/:idCompany', requestsController.addRequest)
module.exports = router