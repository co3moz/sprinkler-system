var gpio = null;

try {
  gpio = require('onoff').Gpio;
} catch (e) {
  const config = require('config');
  const logger = require('gluon/logger');

  try {
    if (config.get('ignorePins') != "true") throw Error();
    module.exports = () => {
      logger.debug('GPIO pin changes are ignored!')
    };
    return;
  } catch (e) {
    logger.error('install onoff library with "npm install onoff --unsafe-perm" command.');
    process.exit(1);
  }
}

const Tap = require('../models/tap');
const pins = {};

module.exports = () => {
  Tap.findAll({
    where: {
      status: {
        $in: ['STANDBY', 'OPERATIVE', 'DONE']
      }
    }
  }).then((taps) => {
    taps.forEach((tap) => {
      if (!pins[tap.gpio]) pins[tap.gpio] = new gpio(tap.gpio, 'out');

      if (tap.status == 'OPERATIVE') {
        pins[tap.gpio].writeSync(1);
      } else {
        pins[tap.gpio].writeSync(0);
        pins[tap.gpio].unexport();
        delete pins[tap.gpio];
      }
    });
  });
};