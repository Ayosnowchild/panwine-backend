const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    image: String,
    stock: Number,
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
