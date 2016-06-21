const Sequelize = require('sequelize');
const db = require('gluon/db');

const User = db.define('User', {
  account: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  }
}, {
  freezeTableName: true,
  paranoid: true,
  indexes: [{
    fields: ['account']
  }]
});

module.exports = User;