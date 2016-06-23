const gluon = require('gluon');
const router = gluon.router();

const Setting = require('../models/setting');

router.get('/', (req, res) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((data) => {
    data.value = "0";
    data.save();

    res.ok({
      active: data.value == "1",
      start: 0
    });
  }).catch(res.database);
});

module.exports = router;