const Tap = require('../models/tap');
const Setting = require('../models/setting');
const Event = require('../models/event');
const socketController = require('./socketController');

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

module.exports = (done) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value != '1') {
      if (active.value == '2') {
        setTimeout(function () {
          socketController.NightMode();
        }, 2000);
      } else {
        socketController.NightMode();
      }
      done();
      return;
    }

    socketController.IROn();

    Tap.find({
      where: {
        status: 'OPERATIVE'
      }
    }).then((tap) => {
      if (tap == null) {
        Tap.find({
          where: {
            status: 'STANDBY'
          },
          order: ['line', 'id']
        }).then((tap) => {
          if (tap == null) {
            active.value = '2';
            active.save().then(() => {
              done()
            });

            Event.log('sprinkling', 'Sulama tamamlandı, otomatik olarak bekleme moduna alındı.');

            socketController.PrintText('Tüm alanlar sulandi. ');
            socketController.IRControl('R');
            return;
          }

          tap.status = 'OPERATIVE';
          if (tap.cycle == null) {
            tap.cycle = tap.duration;
          }

          Event.log('sprinkling', tap.name + ' alanı sulanmaya başlandı.');
          socketController.PrintText(tap.name + ' sulanıyor. ');
          socketController.IRControl('W');
          tap.save().then(() => {
            done()
          });
        });
        return;
      }

      if (--tap.cycle <= 0) {
        tap.cycle = null;
        tap.status = 'DONE';
        Event.log('sprinkling', tap.name + ' alanının sulaması tamamlandı.');
        socketController.PrintText(tap.name + ' sulandı ');
        socketController.IRControl('8');
      }

      tap.save().then(() => {
        done()
      });
    });
  })
};