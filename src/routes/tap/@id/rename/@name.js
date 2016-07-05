const gluon = require('gluon');
const router = gluon.router();

const Tap = require('../../../../models/tap');
const Event = require('../../../../models/event');

router.post('/', (req, res) => {
  Tap.find({
    where: {
      id: req.params.id
    }
  }).then((tap) => {
    if (tap == null) return res.notFound('this tap is not exists');

    Event.log('tap', tap.name + ' yeniden isimlendirilerek ' + req.params.name + ' adını aldı');
    tap.name = req.params.name;
    tap.save().then((tap) => res.ok(tap)).catch(res.database);
  }).catch(res.database);
});

module.exports = router;