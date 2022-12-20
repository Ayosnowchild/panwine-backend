const { Product } = require("../models");

const Create = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.category ||
      !req.body.image ||
      !req.body.stock
    ) {
      return res.status(400).json({ message: "parameter missing" });
    }
    let productExist = await Product.findOne({
      $or: [{ name: req.body.name }, { category: req.body.category }],
    });
    if (productExist) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({
      message: "product created",
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category.ref,
        image: product.image,
        stock: product.stock,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const FetchById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product does not exist",
      });
    }
    return res.status(200).json({
      message: "product fetched",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server issues ",
    });
  }
};

const FetchAll = async (req, res) => {
  try {
    let products = await Product.find({});
    return res.status(200).json({
      message: "products fetched",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server issues ",
    });
  }
};

const Update = async (req, res) => {
  try {
    // if (!req.body.name) {
    //   return res.status(400).json({ message: "name is required" });
    // }
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product does not exist",
      });
    }
    await product.updateOne(req.body);
    return res.status(200).json({
      message: "product updated",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server issues ",
    });
  }
};

const Delete = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "product not exist, cannot be deleted" });
    }
    return res.status(200).json({
      message: "product deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
module.exports = { Create, FetchById, FetchAll, Update, Delete };
