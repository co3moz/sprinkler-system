const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../../models/setting');
const Tap = require('../../models/tap');
const Event = require('../../models/event');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    data.value = "2";
    data.save();
    Event.log('control', 'Sistem manuel olarak bekletilmeye başlandı');

    Tap.update({status: 'STANDBY'}, {
      where: {
        status: {
          $in: ['OPERATIVE']
        }
      }
    });

    res.ok({
      active: true,
      paused: true,
      start: 0
    });
  }).catch(res.database);
});

module.exports = router;