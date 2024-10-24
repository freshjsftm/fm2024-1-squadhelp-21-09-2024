'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  RefreshToken.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      token: { type: DataTypes.TEXT, allowNull: false },
      ua: { type: DataTypes.STRING },
      fingerprint: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      timestamps: true,
    }
  );
  return RefreshToken;
};
