const gluon = require('gluon');
const app = gluon({
  ready: (app) => {
    const db = require('gluon/db');
    const Tap = require('./models/tap');
    const Setting = require('./models/setting');
    const User = require('./models/user');
    const Token = require('gluon/token');

    db.sync().then(() => {
      for (var i = 1; i <= 12; i++) {
        var z = i;
        Tap.findOrCreate({
          where: {
            id: z
          },

          defaults: {
            name: 'Sulama ' + z,
            status: (z >= 1 && z <= 3) || (z == 12) ? 'LOCKED' : 'SILENT',
            line: z,
            gpio: 20 + z
          }
        });
      }

      Setting.findOrCreate({
        where: {
          param: 'active'
        },

        defaults: {
          param: 'active',
          value: '0'
        }
      });

      Setting.findOrCreate({
        where: {
          param: 'start'
        },

        defaults: {
          param: 'start',
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
      }).spread((data) => {
        Token.findOrCreate({
          where: {
            code: '6b71c9c43cafcc0314f45e5ad87b4b06'
          },

          defaults: {
            code: '6b71c9c43cafcc0314f45e5ad87b4b06',
            ownerId: data.id,
            expire: Token.defaultExpire()
          }
        });
      });
    });

    require('./jobs/event');
  }
});
