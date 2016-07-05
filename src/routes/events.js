const gluon = require('gluon');
const router = gluon.router();

const Event = require('../models/event');

router.get('/', (req, res) => {
  const page = req.query.page || 0;

  Event.findAndCountAll({offset: page * 10, limit: 10}).then(data => {
    res.header("totalRows", data.count);
    res.ok(data.rows);
  }).catch(err => res.database(err));
});

module.exports = router;