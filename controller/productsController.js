const Products = require('../model/Products')

exports.addProducts = async (req, res) => {
  // pasar el id de cada company
  const { company } = req.body;
  const product = await Products.find({company})
  res.json(product)
}
