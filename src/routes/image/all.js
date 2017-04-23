const gluon = require('gluon');
const config = require('config');
const fs = require('fs');
const router = gluon.router();

const imageDirectory = config.get('imageDirectory');

var lastProvide = 0;
var cache = null;
function provideImages(fn) {
    if (cache != null && lastProvide > Date.now()) {
        fn(null, cache);
        return;
    }

    fs.readdir(imageDirectory, (err, data) => {
        if (err) return fn(err);
        cache = data;
        lastProvide = Date.now() + 30000;
        fn(null, data);
    });
}

router.get('/', (req, res) => {
    provideImages(res, (err, images) => {
        if (err) return res.unknown(err);
        res.ok(images);
    });
});

module.exports = router;