const gluon = require('gluon');
gluon({
  before: (app) => {
    const compression = require('compression');
    app.use(compression());
  },
  ready: () => {
    const db = require('gluon/db');
    const Tap = require('./models/tap');
    const Setting = require('./models/setting');
    const User = require('./models/user');
    const Token = require('gluon/token');

    db.sync().then(() => {
      Tap.findOrCreate({
        where: {
          id: 1
        },

        defaults: {
          name: 'Yol Boyu',
          status: 'LOCKED',
          line: 12,
          gpio: 11
        }
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 2
          },

          defaults: {
            name: 'Orta',
            status: 'LOCKED',
            line: 11,
            gpio: 13
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 3
          },

          defaults: {
            name: 'Erik Altı',
            status: 'LOCKED',
            line: 10,
            gpio: 15
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 4
          },

          defaults: {
            name: 'Sivri Biber',
            status: 'SILENT',
            line: 4,
            gpio: 31
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 5
          },

          defaults: {
            name: 'Kapya',
            status: 'SILENT',
            line: 3,
            gpio: 33
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 6
          },

          defaults: {
            name: 'Kıl Biber',
            status: 'SILENT',
            line: 2,
            gpio: 35
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 7
          },

          defaults: {
            name: 'Salatalık',
            status: 'SILENT',
            line: 1,
            gpio: 37
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 8
          },

          defaults: {
            name: 'Maraş',
            status: 'SILENT',
            line: 8,
            gpio: 32
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 9
          },

          defaults: {
            name: 'Sivri Biber',
            status: 'SILENT',
            line: 7,
            gpio: 36
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 10
          },

          defaults: {
            name: 'Domates',
            status: 'SILENT',
            line: 6,
            gpio: 38
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 11
          },

          defaults: {
            name: 'Kabak',
            status: 'SILENT',
            line: 5,
            gpio: 40
          }
        })
      }).then(() => {
        return Tap.findOrCreate({
          where: {
            id: 12
          },

          defaults: {
            name: 'Kıyı',
            status: 'LOCKED',
            line: 9,
            gpio: 7
          }
        }).then(() => {
          return Setting.findOrCreate({
            where: {
              param: 'active'
            },

            defaults: {
              param: 'active',
              value: '0'
            }
          })
        }).then(() => {
          return Setting.findOrCreate({
            where: {
              param: 'start'
            },

            defaults: {
              param: 'start',
              value: '0'
            }
          })
        }).then(() => {
          return User.findOrCreate({
            where: {
              account: 'drderya'
            },

            defaults: {
              account: 'drderya',
              password: 'c4ca4238a0b923820dcc509a6f75849b'
            }
          })
        }).then(() => {
          return User.findOrCreate({
            where: {
              account: 'co3moz'
            },

            defaults: {
              account: 'co3moz',
              password: 'c4ca4238a0b923820dcc509a6f75849b'
            }
          })
        }).spread((data) => {
          return Token.findOrCreate({
            where: {
              code: '6b71c9c43cafcc0314f45e5ad87b4b06'
            },

            defaults: {
              code: '6b71c9c43cafcc0314f45e5ad87b4b06',
              ownerId: data.id,
              expire: Token.defaultExpire()
            }
          });
        }).then(() => {
          require('./jobs/event');
        });
      });
    });
  }
});