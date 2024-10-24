'use strict';
const { Model } = require('sequelize');
const { OFFER_STATUSES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
      Offer.belongsTo(models.Contest, { foreignKey: 'contestId', sourceKey: 'id' });
      Offer.hasOne(models.Rating, { foreignKey: 'offerId', targetKey: 'id' })
    }
  }
  Offer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(OFFER_STATUSES)),
        allowNull: true,
        defaultValue: OFFER_STATUSES.PENDING,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: true,
    }
  );
  return Offer;
};
