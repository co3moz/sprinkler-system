const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../models/setting');
const Tap = require('../models/tap');

const pinController = require('../jobs/pinController');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    data.value = "0";
    data.save();

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