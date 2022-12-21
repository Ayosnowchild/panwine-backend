"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.NUMBER, allowNull: false },
      category: {
        type: DataTypes.UUID,
        references: {
          model: "Category",
          key: "id",
        },
      },
      image: { type: DataTypes.STRING, allowNull: false },
      stock: { type: DataTypes.NUMBER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps,
      paranoid,
    }
  );
  return Product;
};
