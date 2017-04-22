const gluon = require('gluon');
const exec = require('child_process').exec;
const router = gluon.router();

router.get('/', (req, res) => {
  exec('fswebcam -d /dev/video0 -S 20 -s brightness=150% -s Contrast=150% -s Gamma=150% -r 640x480 -s Sharpness =50% -s Saturation=50% --fps 5 --save test2.png --png 10', (err, stdout, stderr) => {
    if (err) {
      res.ok("{0:j:4}\n  stdout:{1}\n  stderr: {2}".format(err, stdout, stderr));
      return;
    }

    res.send('test2.png');
  });
});

module.exports = router;