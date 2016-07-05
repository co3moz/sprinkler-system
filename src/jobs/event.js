const mainTimer = require('./mainTimer');
const pinController = require('./pinController');

setInterval(() => {
  mainTimer(pinController);
}, 1000);