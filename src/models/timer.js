const Sequelize = require('sequelize');
const db = require('gluon/db');

const Timer = db.define('Timer', {
  cron: {
    type: Sequelize.STRING,
    allowNull: false
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  freezeTableName: true,
  paranoid: true,
  indexes: [{
    fields: ['cron']
  }]
});

module.exports = Timer;