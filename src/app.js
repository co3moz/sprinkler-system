const gluon = require('gluon');
const app = gluon({
  ready: (app) => {
    const db = require('gluon/db');
    const Pod = require('./models/pod');
    const Setting = require('./models/setting');
    const User = require('./models/user');
    db.sync({force: true}).then(() => {
      for (var i = 1; i <= 12; i++) {
        var z = i;
        Pod.findOrCreate({
          where: {
            id: z
          },

          defaults: {
            name: 'Sulama ' + z,
            status: 'SILENT',
            line: z,
            locked: false,
            gpio: 20 + z
          }
        });
      }

      Setting.findOrCreate({
        where: {
          param: 'run'
        },

        defaults: {
          param: 'run',
          value: '0'
        }
      });

      User.findOrCreate({
        where: {
          account: 'drderya'
        },

        defaults: {
          account: 'drderya',
          password: 'c4ca4238a0b923820dcc509a6f75849b'
        }
      });

      User.findOrCreate({
        where: {
          account: 'co3moz'
        },

        defaults: {
          account: 'co3moz',
          password: 'c4ca4238a0b923820dcc509a6f75849b'
        }
      });
    });
  }
});
