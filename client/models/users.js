'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    ZipCode: DataTypes.INTEGER,
    CompanyPosition: DataTypes.STRING,
    Password: DataTypes.STRING

  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};