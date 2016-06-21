const Sequelize = require('sequelize');
const db = require('gluon/db');

const Pod = db.define('Pod', {
  name: {
    type: Sequelize.STRING
  },

  status: {
    type: Sequelize.ENUM('SILENT', 'STANDBY', 'OPERATIVE', 'DONE'),
    defaultValue: 'SILENT',
    allowNull: false
  },

  line: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  locked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  gpio: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  freezeTableName: true,
  paranoid: true,
  indexes: [{
    fields: ['name']
  }]
});

module.exports = Pod;