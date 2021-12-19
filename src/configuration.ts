import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
// import * as bodyParser from 'koa-bodyparser';
import koaBody = require('koa-body');
import * as session from 'koa-session';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
// import cors = require('koa-cors');

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
          key: 'server_session', // cookie key
          maxAge: 24 * 3600 * 1000, // 1天
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
        multipart: true, // 支持文件上传
        // encoding:'gzip',
        // formidable:{
        //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
        //   keepExtensions: true,    // 保持文件的后缀
        //   maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
        //   onFileBegin:(name,file) => { // 文件上传前的设置
        //     // console.log(`name: ${name}`);
        //     // console.log(file);
        //   },
        // }
      })
    );
  }
}
