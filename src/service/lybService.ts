import { InjectEntityModel } from '@midwayjs/orm';
import { Lyb } from './../entity/lyb';
import { Provide } from '@midwayjs/decorator';

@Provide()
export default class LybService {
  @InjectEntityModel(Lyb)
  lybModel: any;

  async getData() {
    const allData = await this.lybModel.find();
    return allData;
  }

  async saveData(data: any) {
    const result = await this.lybModel.save(data);
    return result;
  }
}
