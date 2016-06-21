const Sequelize = require('sequelize');
const db = require('gluon/db');

const Setting = db.define('Setting', {
  param: {
    type: Sequelize.STRING,
    allowNull: false
  },

  value: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  paranoid: true,
  indexes: [{
    fields: ['param']
  }]
});

module.exports = Setting;