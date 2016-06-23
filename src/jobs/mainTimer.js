const Tap = require('../models/tap');
const Setting = require('../models/setting');

module.exports = () => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value != '1') {
      Tap.update({status: 'STANDBY'}, {
        where: {
          status: 'OPERATIVE'
        }
      });
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
            Tap.update({status: 'STANDBY', endTime: null}, {
              where: {
                status: 'DONE'
              }
            });

            active.value = '0';
            active.save();
            return;
          }

          tap.status = 'OPERATIVE';
          if (tap.endTime == null) {
            tap.endTime = Date.now() + tap.duration;
          }
          tap.save();
        });
        return;
      }

      if (tap.endTime < Date.now()) {
        tap.endTime = null;
        tap.status = 'DONE';
        tap.save();
      }
    });
  })
};