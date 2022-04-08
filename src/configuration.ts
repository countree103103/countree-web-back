import * as defaultConfig from './config/config.default';
import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
// import * as bodyParser from 'koa-bodyparser';
import koaBody = require('koa-body');
import * as session from 'koa-session';
import * as orm from '@midwayjs/orm';
// import cors = require('koa-cors');
@Configuration({
  // imports: [koaFramework, orm],
  imports: [orm],
  importConfigs: [{ default: defaultConfig }],
})
export class ContainerLifeCycle {
  @App()
  app: Application;
  async onReady(): Promise<void> {
    this.app.keys = ['52013140'];
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
    // this.app.use(
    //   cors({
    //     origin: 'http://localhost:8080',
    //     credentials: true,
    //   })
    // );
    this.app.use(
      session(
        {
          key: 'server_session',
          maxAge: 24 * 3600 * 1000,
        },
        this.app
      )
    );
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(
      // bodyParser({
      //   enableTypes: ['json', 'form', 'xml', 'text'],
      // })
      koaBody({
        multipart: true,
      })
    );
  }
}
