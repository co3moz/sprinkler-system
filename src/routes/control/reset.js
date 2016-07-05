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
    data.value = '0';
    data.save();

    Event.destroy({
      where: {}
    }).then(() => {
      Event.log('reset', 'Reset atıldı.');
    });

    res.ok('restarting');
    Tap.update({status: 'SILENT', cycle: null}, {
      where: {
        status: {
          $in: ['STANDBY', 'OPERATIVE', 'DONE']
        }
      }
    }).then(() => {
      setTimeout(() => process.exit(0), 2000);
    });
  }).catch(res.database);
});

module.exports = router;