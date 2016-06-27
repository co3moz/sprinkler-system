var gpio = null;
const logger = require('gluon/logger');

try {
  gpio = require('onoff').Gpio;
} catch (e) {
  const config = require('config');

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
      if (!pins[tap.gpio]) {
        logger.debug('pin {0} opened', tap.gpio);
        pins[tap.gpio] = new gpio(tap.gpio, 'out');
      }

      if (tap.status == 'OPERATIVE') {
        pins[tap.gpio].writeSync(1);
        logger.debug('pin {0} setted to {1}', tap.gpio, 1);
      } else {
        pins[tap.gpio].writeSync(0);
        logger.debug('pin {0} setted to {1}', tap.gpio, 0);
      }
    });
  });
};

process.on('exit', (code) => {
  Object.keys(pins).forEach((pin) => {
    logger.debug('pin {0} closed', pin);
    pins[pin].writeSync(0);
    pins[pin].unexport();
  })
});