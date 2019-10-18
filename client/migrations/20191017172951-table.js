'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('Users', 'Address', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Users', 'City', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Users', 'State', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Users', 'ZipCode', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Users', 'CompanyPosition', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Users', 'Password', {
                  type: Sequelize.STRING,
              }, { transaction: t })

      ])        
    })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('Users', 'Address', { transaction: t }),
              queryInterface.removeColumn('Users', 'City', { transaction: t }),
              queryInterface.removeColumn('Users', 'State', { transaction: t }),
              queryInterface.removeColumn('Users', 'ZipCode', { transaction: t }),
              queryInterface.removeColumn('Users', 'CompanyPosition', { transaction: t }),
              queryInterface.removeColumn('Users', 'Password', { transaction: t })
          ])
      })
  }
};
