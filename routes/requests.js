const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requestsController = require('../controller/requestsController')
//from company app
router.get('/companies/:company', auth, requestsController.getRequest)
//from ecommerce
router.post('/companies', requestsController.addRequest)
module.exports = router