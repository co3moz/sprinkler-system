const md5 = require('js-md5');
const gluon = require('gluon');
const control = require('gluon/control');

const router = gluon.router();

router.post('/', control(['oldPw', 'newPw']), (req, res) => {
  if(req.user.password == md5(req.body.oldPw)) {
    req.user.password = md5(req.body.newPw);
    req.user.save().then(() => res.ok('changed')).catch(res.database);
  } else {
    res.status(500);
    res.send('invalid pw');
  }
});

router.all('/', (req, res) => res.redirectRequest('use post'));

module.exports = router;