const Sequelize = require('sequelize');
const db = require('gluon/db');

const Event = db.define('Event', {
  position: {
    type: Sequelize.STRING
  },

  message: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  classMethods: {
    /**
     * @memberof Event
     * @param position
     * @param message
     */
    log: (position, message) => {
      Event.create({
        position,
        message
      });
    }
  }
});

module.exports = Event;