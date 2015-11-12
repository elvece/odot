'use strict';
//down should match up from previous migration, new up adds new schema info - only whatever column you ar changing

//RESEARCH: how would you update a column vs add column, can you add more than one (chain migration updates?)
module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.addColumn('Users', 'admin', {

      // email: {
      //   type: Sequelize.STRING,
      //   required: true,
      //   allowNull: false,
      //   validation: {
      //     isEmail: true
      //   }

      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        required: true,
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'admin');
  }
};
