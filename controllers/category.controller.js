const { Category } = require("../models");

const Create = async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(400).json({
        message: "name is required",
      });
    let category = await Category.create(req.body);
    return res.status(201).json({
      message: "category created",
      data: category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server issues ",
    });
  }
};

const FetchById = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "category does not exist",
      });
    }
    return res.status(200).json({
      message: "category fetched",
      data: category,
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
    let categories = await Category.find({});
    return res.status(200).json({
      message: "categories fetched",
      data: categories,
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
    if (!req.body.name) {
      return res.status(400).json({ message: "name is required" });
    }
    let category = await Category.findById(req.params.id);
    await category.update(req.body);
    return res.status(200).json({
      message: "category updated",
      data: category,
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
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "category not exist, cannot be deleted" });
    }
    return res.status(200).json({
      message: "category deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
module.exports = {
  Create,
  FetchById,
  FetchAll,
  Delete,
  Update,
};
