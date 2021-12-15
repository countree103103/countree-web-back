import * as path from 'path';

export default {
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

    logging: true,
  },
};
