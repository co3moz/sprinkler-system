const md5 = require('js-md5');
const gluon = require('gluon');
const control = require('gluon/control');
const User = require('../models/user');

const router = gluon.router();

router.post('/', control(['account', 'password']), (req, res) => {
  User.find({
    where: {
      account: req.body.account,
      password: md5(req.body.password)
    },
    attributes: [
      'id'
    ]
  }).then((user) => {
    if (user == null) return res.unauthorized('invalid credentials');

    req.auth.login(user).then((token) => res.ok(token));
  }).catch(res.database);
});

router.all('/', (req, res) => res.redirectRequest('use post'));

module.exports = router;