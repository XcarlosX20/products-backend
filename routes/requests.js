const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requestsController = require('../controller/requestsController')
//from company app
router.get('/', auth, requestsController.getRequest)
router.put('/:id', auth, requestsController.editRequest)
//from ecommerce
router.post('/company/:idCompany', requestsController.addRequest)
module.exports = router