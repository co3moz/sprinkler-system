const gluon = require('gluon');
const config = require('config');
const path = require('path');
const router = gluon.router();

const imageDirectory = config.get('imageDirectory');

router.get('/:image', (req, res) => {
    res.sendFile(path.resolve(imageDirectory, req.params.image));
});

module.exports = router;