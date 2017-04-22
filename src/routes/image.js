const gluon = require('gluon');
const spawn = require('child_process').spawn;
const router = gluon.router();
const path = require('path');

router.get('/', (req, res) => {
  var loc = path.resolve(__dirname, "../../testimage.png");
  var stdout = '';
  var stderr = '';

  const bat = spawn('fswebcam', ['-d', '/dev/video0', '-S', '20', '-s', 'brightness=150%', '-s', 'Contrast=150%', '-s', 'Gamma=150%', '-r', '640x480', '-s', 'Sharpness=50%', '-s', 'Saturation=50%', '--fps', '5', '--save', loc], { shell: true });

  bat.stdout.on('data', (data) => {
    stdout += (data.toString());
  });

  bat.stderr.on('data', (data) => {
    stderr += (data.toString());
  });

  bat.on('exit', (code) => {
    if (code != 0) {
      res.ok("code: {0}\n  stdout:{1}\n  stderr: {2}".format(code, stdout, stderr));
      return;
    }

    res.send('test2.png');
  });
});

module.exports = router;