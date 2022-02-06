const express = require('express')
const router = express.Router()
const productsController = require('../controller/productsController')
// const auth = require('../middleware/auth')
router.get('/', productsController.addProducts)
module.exports = router
