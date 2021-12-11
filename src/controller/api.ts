import { Context } from '@midwayjs/koa';
import {
  Inject,
  Controller,
  Provide,
  Get,
  Post,
  Body,
  SetHeader,
  ALL,
  RequestIP,
  Headers,
} from '@midwayjs/decorator';
import LybService from '../service/lybService';
import { LybEntity } from '../entity/lyb';
import * as fs from 'fs/promises';

@Provide()
@Controller('/ajax')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  lybService: LybService;

  @Get('/lyb')
  async getLyb() {
    return this.lybService.getData();
  }

  @Get('/oynn')
  async getOynn() {
    return await fs.readdir(__dirname + '/../../www/img/oynn');
  }

  @Post('/lyb')
  @SetHeader('Access-Control-Allow-Origin', '*')
  async postLyb(@Body(ALL) body: any) {
    const newMessage = new LybEntity();
    newMessage.guest_message = body.guest_message;
    newMessage.guest_name = body.guest_name;
    newMessage.time = new Date();
    return this.lybService.saveData(newMessage);
  }

  @Get('/ip')
  @SetHeader('Access-Control-Allow-Origin', '*')
  async getIp(@RequestIP() ip: string, @Headers('x-real-ip') realIp: any) {
    const reg = /.*:(.*)/;
    if (realIp) {
      return realIp;
    }
    if (reg.test(ip)) {
      const rsl = reg.exec(ip);
      return rsl[1];
    } else {
      return ip;
    }
  }
}
