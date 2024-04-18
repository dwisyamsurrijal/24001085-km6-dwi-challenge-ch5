'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {

    static associate(models) {
      cars.belongsTo(models.cartypes, { foreignKey: "cartype_id" });
    }
  }
  cars.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    cartype_id: DataTypes.INTEGER,
    rentPerDay: DataTypes.INTEGER,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};