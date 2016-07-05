const gluon = require('gluon');
const router = gluon.router();

const Tap = require('../../models/tap');

router.get('/', (req, res) => {
  Tap.findAll().then((data) => res.ok(data)).catch(res.database);
});

module.exports = router;