import { Context } from '@midwayjs/koa';
import {
  Inject,
  Controller,
  Provide,
  Body,
  Get,
  // SetHeader,
  ALL,
  // Param,
  Query,
  Post,
} from '@midwayjs/decorator';
import wxService from '../service/wx/utils';
import wifiService from '../service/wx/wifi';
import { WifiEntity } from '../entity/wifi';

@Provide()
@Controller('/wx-api')
export class WXAPIController {
  @Inject()
  ctx: Context;

  @Inject()
  wx: wxService;

  @Inject()
  wifi: wifiService;

  @Get('/')
  async token(@Query(ALL) query: any, @Body(ALL) body: any) {
    if (this.wx.wxValidate(query)) return query.echostr;
    else return 'authorize failed!';
  }

  @Post('/')
  async defaultFunc(@Query(ALL) query: any, @Body(ALL) body: any) {
    if (!this.wx.wxValidate(query)) {
      return 'authorize failed!';
    } else {
      // return this.wx.respone(body,'auto respone')
      const content = this.wx.getContent(body);
      let str = '';
      switch (true) {
        case /wifi/.test(content): {
          const wifis = await this.wifi.getAll();
          if (wifis.length) {
            for (const item of wifis) {
              str += `${item.ssid} : ${item.pwd}\n`;
            }
          } else {
            str = '暂时没有数据';
          }
          break;
        }
        case true: {
          str = '默认自动回复';
          break;
        }
      }
      return this.wx.respone(body, str);
    }
  }

  @Get('/wifi')
  async wifiGetFunc(@Query(ALL) query: any, @Body(ALL) body: any) {
    if (!this.wx.wxValidate(query)) {
      return 'authorize failed!';
    } else {
      let wifiData;
      query.ssid
        ? (wifiData = this.wifi.getBySSID(query.ssid))
        : (wifiData = this.wifi.getAll());
      5;
      return wifiData;
    }
  }

  @Post('/wifi')
  async wifiPostFunc(@Query(ALL) query: any, @Body(ALL) body: any) {
    if (!this.wx.wxValidate(query)) {
      return 'authorize failed!';
    } else {
      console.log(body);
      let wifiData;
      // 判断数据库内是否存在该ssid
      if ((wifiData = await this.wifi.getBySSID(body.ssid))) {
        // 判断密码是否相同,若不同则更新
        if (wifiData.pwd !== body.pwd) {
          wifiData.pwd = body.pwd;
          return this.wifi.updatePwd(wifiData, body.pwd);
        } else {
          return '密码未改变';
        }
      } else {
        wifiData = new WifiEntity();
        wifiData.ssid = body.ssid;
        wifiData.pwd = body.pwd;
        wifiData.updateTime = new Date();
        return this.wifi.saveOne(wifiData);
      }
    }
  }
}
