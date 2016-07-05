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
    Promise.all([Setting.find({
      where: {
        param: 'start'
      }
    }), Tap.findAll(), Event.findAll({limit: 5, order: [['createdAt', 'desc'], ['id', 'desc']]})]).then((values) => {
      res.ok({
        status: {
          active: data.value != "0",
          paused: data.value == "2",
          start: data.value != "0" ? parseInt(values[0].value) : 0
        },
        taps: values[1],
        events: values[2]
      });
    }).catch(res.database);
  }).catch(res.database);
});

module.exports = router;