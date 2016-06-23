const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../models/setting');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    data.value = "1";

    Setting.find({
      where: {
        param: 'start'
      }
    }).then((start) => {
      start.value = Date.now().toString();

      data.save();
      start.save();

      res.ok({
        active: data.value == "1",
        start: data.value == "1" ? parseInt(start.value) : 0
      });
    }).catch(res.database);
  }).catch(res.database);
});

module.exports = router;