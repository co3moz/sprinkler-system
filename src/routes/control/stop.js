const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../../models/setting');
const Tap = require('../../models/tap');
const Event = require('../../models/event');

const pinController = require('../../jobs/pinController');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    var previous = data.value;
    data.value = "0";
    data.save();
    if (previous == "2") {
      Event.log('control', 'Sulama beklemedeyken sistem durduruldu');
    } else if (previous == "1") {
      Event.log('control', 'Sulama henüz bitmemişken sistem durduruldu');
    }

    Tap.update({status: 'STANDBY', cycle: null}, {
      where: {
        status: {
          $in: ['OPERATIVE', 'DONE']
        }
      }
    });

    pinController();

    res.ok({
      active: false,
      paused: false,
      start: 0
    });
  }).catch(res.database);
});

module.exports = router;