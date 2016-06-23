const Sequelize = require('sequelize');
const db = require('gluon/db');

const Tap = db.define('Tap', {
  name: {
    type: Sequelize.STRING
  },

  status: {
    type: Sequelize.ENUM('SILENT', 'STANDBY', 'OPERATIVE', 'DONE', 'LOCKED'),
    defaultValue: 'SILENT',
    allowNull: false
  },

  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 600000,
    allowNull: false
  },

  endTime: {
    type: Sequelize.DATE
  },

  line: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  gpio: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
  paranoid: false,
  indexes: [{
    fields: ['name']
  }]
});

module.exports = Tap;