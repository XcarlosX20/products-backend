const Products = require('../model/Products')

exports.addProducts = async (req, res) => {
  const product = await Products.find()
  res.json(product)
}
