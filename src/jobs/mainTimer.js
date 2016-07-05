const Tap = require('../models/tap');
const Setting = require('../models/setting');
const Event = require('../models/event');

module.exports = (done) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value != '1') {
      done();
      return;
    }

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
            return;
          }

          tap.status = 'OPERATIVE';
          if (tap.cycle == null) {
            tap.cycle = tap.duration;
          }

          Event.log('sprinkling', tap.name + ' alanı sulanmaya başlandı.');
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
      }

      tap.save().then(() => {
        done()
      });
    });
  })
};