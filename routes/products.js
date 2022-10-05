const express = require('express')
const router = express.Router()
const productsController = require('../controller/productsController')
const auth = require('../middleware/auth')
// const auth = require('../middleware/auth')
router.get('/', auth, productsController.getProducts)
router.post('/', auth, productsController.addProducts)
router.put('/:idProduct', auth, productsController.editProducts)
router.delete('/:idProduct', auth, productsController.deleteProducts)
module.exports = router
//ecommerce
router.get('/:idCompany', productsController.getProductsEcommerce)
