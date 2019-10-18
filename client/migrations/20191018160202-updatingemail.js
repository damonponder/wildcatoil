'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'Email', {
          type: Sequelize.STRING,
      }, { transaction: t })
  
  ])        
})
},


  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'Email', { transaction: t })
      ])
    })
  }
};

    

