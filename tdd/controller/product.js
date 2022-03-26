const { update } = require('../models/Product');
const Product = require('../models/Product');
const productModel = require('../models/Product');

// 여기 아무것도 없으면 오류남
exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    // console.log('createdProduct', createdProduct);
    // Promise 로 옴
    res.status(201).json(createdProduct);
  } catch (err) {
    // console.error(err);
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    // console.error(err);
    next(err)
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true },
    )
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
  try {
    let deletedProduct = await productModel.findByIdAndDelete(req.params.productId)
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};