const gluon = require('gluon');
const config = require('config');
const path = require('path');
const router = gluon.router();

const imageDirectory = config.get('imageDirectory');


router.get('/last', (req, res) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    let finalDate = year + "-" + month + "-" + day;
    let finalHour = hour + "-" + minutes;
    res.sendFile(path.resolve(imageDirectory, finalDate + '/', finalDate + '-' + finalHour + '.jpg'));
});

router.get('/:date/:image', (req, res) => {
    res.sendFile(path.resolve(imageDirectory, req.params.date + '/', req.params.date + '-' + req.params.image + '.jpg'));
});




module.exports = router;
