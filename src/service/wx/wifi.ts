import { WifiEntity } from './../../entity/wifi';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';

@Provide()
export default class wifiService {
  @InjectEntityModel(WifiEntity)
  wifi: Repository<WifiEntity>;

  async getAll(): Promise<WifiEntity[]> {
    return await this.wifi.find();
  }

  async getBySSID(ssid: string) {
    return this.wifi.findOne({ ssid: ssid });
  }

  async saveOne(data: WifiEntity) {
    // if (this.wifi.findOne({ ssid: data.ssid }))
    //   return '已存在此SSID数据,保存失败';
    this.wifi.save(data);
    return '保存成功';
  }

  async updatePwd(data: WifiEntity, pwd: string) {
    this.wifi.save(data);
    return '密码已更新';
  }
}
