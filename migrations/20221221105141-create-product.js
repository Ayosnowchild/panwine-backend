"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: { type: Sequelize.NUMBER, allowNull: false },
      category: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "categories",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },
      image: { type: Sequelize.STRING, allowNull: false },
      stock: { type: Sequelize.NUMBER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
