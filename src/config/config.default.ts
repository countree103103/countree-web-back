import * as path from 'path';

export default {
  session: {
    key: 'server_session',
    maxAge: 24 * 3600 * 1000,
  },

  koa: {
    port: 7001,
  },

  keys: '7788countree',

  // middleware : [],
  wxToken: '7788countree',

  security: {
    csrf: {
      enable: false,
    },
  },

  orm: {
    type: 'sqlite',

    database: path.join(__dirname, '../../data.db'),

    synchronize: true,

    logging: false,
  },
};
