const Tap = require('../models/tap');
const Setting = require('../models/setting');

module.exports = () => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value != '1') {
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
            Tap.update({status: 'STANDBY', cycle: null}, {
              where: {
                status: 'DONE'
              }
            });

            active.value = '0';
            active.save();
            return;
          }

          tap.status = 'OPERATIVE';
          if (tap.cycle == null) {
            tap.cycle = tap.duration;
          }
          tap.save();
        });
        return;
      }

      if (--tap.cycle < 1) {
        tap.cycle = null;
        tap.status = 'DONE';
      }

      tap.save();
    });
  })
};