const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../../models/setting');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    Setting.find({
      where: {
        param: 'start'
      }
    }).then((start) => {
      res.ok({
        active: data.value != "0",
        paused: data.value == "2",
        start: data.value != "0" ? parseInt(start.value) : 0
      });
    }).catch(res.database);
  }).catch(res.database);
});

module.exports = router;