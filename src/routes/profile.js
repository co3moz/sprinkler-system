const gluon = require('gluon');
const router = gluon.router();

router.get('/', (req, res) => {
  res.ok(req.user);
});

module.exports = router;