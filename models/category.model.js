const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamp: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
