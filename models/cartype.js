'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartypes.hasMany(models.cars, { foreignKey: "cartype_id" });
    }
  }
  cartypes.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cartypes",
      tableName: "cartypes",
    }
  );
  return cartypes;
};