const gluon = require('gluon');
const router = gluon.router();

const Tap = require('../../../../models/tap');

router.post('/', (req, res) => {
  Tap.find({
    where: {
      id: req.params.id
    }
  }).then((tap) => {
    if (tap == null) return res.notFound('this tap is not exists');

    tap.duration = req.params.duration;
    tap.save().then((tap) => res.ok(tap)).catch(res.database);
  }).catch(res.database);
});

module.exports = router;