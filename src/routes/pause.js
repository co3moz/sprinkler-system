const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../models/setting');
const Tap = require('../models/tap');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    data.value = "2";
    data.save();

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