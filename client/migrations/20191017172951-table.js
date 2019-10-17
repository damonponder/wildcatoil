'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
        // logic for transforming into the new state
        return queryInterface.addColumn(
          'users',
          'Address',
          'City',
          'State',
          'ZipCode',
          'CompanyPosition',
          'Password',
         Sequelize.BOOLEAN
        );
    
      },
    
      down: function(queryInterface, Sequelize) {
        // logic for reverting the changes
        return queryInterface.removeColumn(
          'users',
          'Address',
          'City',
          'State',
          'ZipCode',
          'CompanyPosition',
          'Password'
        );
      }
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
