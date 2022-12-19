const { User, Product } = require("../models");

const CreateProductController = async (req, res) => {
  try {
    //   let userExist = await User.findOne({
    //     $or: [{ email: req.body.email }, { username: req.body.username }],
    //   });
    //   if (userExist) {
    //     return res.status(400).json({
    //       message: "User already exists",
    //     });
    //   }
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

module.exports = { CreateProductController };
