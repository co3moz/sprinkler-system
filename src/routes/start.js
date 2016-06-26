const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../models/setting');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    var previous = data.value;
    data.value = "1";

    Setting.find({
      where: {
        param: 'start'
      }
    }).then((start) => {
      if (previous == "0")  start.value = Date.now().toString();

      data.save();
      start.save();

      res.ok({
        active: true,
        paused: false,
        start: data.value != "0" ? parseInt(start.value) : 0
      });
    }).catch(res.database);
  }).catch(res.database);
});

module.exports = router;