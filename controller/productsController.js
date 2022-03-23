const Products = require('../model/Products')
//const connectDBAuth = require('../config/dbAuth')
exports.getProducts = async (req, res) => {
  // pasar el id de cada company
  const company  = req.company.id;
   const product = await Products.find({company})
   res.json(product)
   //connectDBAuth(req.company.db)
}
exports.addProducts = async (req, res) => {
  // pasar el id de cada company
  const newProduct = new Products(req.body);
  await newProduct.save()
}
exports.editProducts = async (req, res) => {
  // pasar el id de cada company
  const {idProduct} = req.params
  const product = await Products.findByIdAndUpdate(idProduct, req.body)
  res.json(product)
}
exports.deleteProducts = async (req, res) => {
  // pasar el id de cada company
  const {idProduct} = req.params
  await Products.findByIdAndDelete(idProduct)
  res.send('deleted')
}
exports.getProductsEcommerce = async(req, res) => {
  const { idCompany, category } = req.params
   const products = await Products.find({idCompany})
   res.json(products.filter(product => product.category === category))
}