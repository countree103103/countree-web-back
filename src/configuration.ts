import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import { join } from 'path';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
  ],
  importConfigs: [join(__dirname, './config/')],
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady(): Promise<void> {
    this.app.use(
      session(
        {
          key: 'session', // cookie key
          maxAge: 24 * 3600 * 1000, // 1天
        },
        this.app
      )
    );
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(
      bodyParser({
        enableTypes: ['json', 'form', 'xml', 'text'],
      })
    );
  }
}
