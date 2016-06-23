const gluon = require('gluon');
const router = gluon.router();

const Tap = require('../../../models/tap');
const Setting = require('../../../models/setting');

router.post('/', (req, res, next) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value != '1') {
      return next();
    }

    Tap.find({
      where: {
        id: req.params.id
      }
    }).then((tap) => {
      if (tap == null) return res.notFound('this tap is not exists');
      res.ok(tap);
    });
  }).catch(res.database);
}, (req, res) => {
  Tap.find({
    where: {
      id: req.params.id
    }
  }).then((tap) => {
    if (tap == null) return res.notFound('this tap is not exists');

    if (tap.status == 'SILENT') {
      tap.status = 'STANDBY';
    } else if (tap.status == 'STANDBY') {
      tap.status = 'SILENT';
    }

    tap.save().then((tap) => res.ok(tap)).catch(res.database);
  }).catch(res.database);
});

module.exports = router;