import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: true,
    },
  };

  config.orm = {
    type: 'sqlite',

    database: path.join(__dirname, '../../data.db'),

    synchronize: true,

    logging: true,
  };

  return config;
};
