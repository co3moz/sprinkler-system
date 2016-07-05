const gluon = require('gluon');
const router = gluon.router();

const Tap = require('../../../models/tap');
const Setting = require('../../../models/setting');
const Event = require('../../../models/event');

router.post('/', (req, res, next) => {
  Setting.find({
    where: {
      param: 'active'
    }
  }).then((active) => {
    if (active.value == '0') {
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
      tap.status = 'LOCKED';
      Event.log('tap', tap.name + ' alanı kilitlendi');
    } else if (tap.status == 'LOCKED') {
      tap.status = 'SILENT';
      Event.log('tap', tap.name + ' alanı kilidi açıldı');
    }


    tap.save().then((tap) => res.ok(tap)).catch(res.database);
  }).catch(res.database);
});

module.exports = router;