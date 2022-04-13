import * as defaultConfig from './config/config.default';
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import koaBody = require('koa-body');
import * as orm from '@midwayjs/orm';
@Configuration({
  imports: [koa, orm],
  importConfigs: [{ default: defaultConfig }],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;
  async onReady(): Promise<void> {
    this.app.use(async (ctx, next) => {
      const origin = ctx.header['origin'];
      origin
        ? ctx.append('Access-Control-Allow-Origin', origin)
        : ctx.append('Access-Control-Allow-Origin', '*');
      ctx.append('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
      ctx.append('Access-Control-Allow-Credentials', 'true');
      ctx.cookies.set('SameSite', 'None');
      await next();
    });
    this.app.use(
      koaBody({
        multipart: true,
      })
    );
  }
}
