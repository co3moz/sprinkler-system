const gluon = require('gluon');

const router = gluon.router();

router.post('/', (req, res) => {
  req.auth.logout().then((data) => res.ok());
});

router.all('/', (req, res) => res.redirectRequest('use post'));

module.exports = router;