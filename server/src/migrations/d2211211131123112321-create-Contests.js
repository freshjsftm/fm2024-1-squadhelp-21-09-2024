const { CONTEST_TYPES, CONTEST_STATUSES } = require("../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      originalFileName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      typeOfName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      industry: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      focusOfWork: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      targetCustomer: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      styleName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      nameVenture: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      typeOfTagline: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_STATUSES)),
      },
      brandStyle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contests');
  },
};
