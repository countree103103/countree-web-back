import { CoffeeUserEntity } from './../../entity/coffee-shop-final/User';
import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { getRepository, Repository } from 'typeorm';

@Provide()
export default class CoffeeUserService {
  @InjectEntityModel(CoffeeUserEntity)
  userModel: CoffeeUserEntity;

  manager: Repository<CoffeeUserEntity>;

  LybService(): void {
    this.manager = getRepository(CoffeeUserEntity);
  }

  async getAllUser(): Promise<CoffeeUserEntity[]> {
    const users: CoffeeUserEntity[] = await this.manager.find();
    return users;
  }

  async login(user: CoffeeUserEntity): Promise<boolean | CoffeeUserEntity> {
    const d_user: CoffeeUserEntity = await this.manager.findOne({
      where: { user_name: user.user_name, user_password: user.user_password },
    });
    return d_user ? d_user : false;
  }

  async register(new_user: CoffeeUserEntity): Promise<boolean> {
    const d_user: CoffeeUserEntity = await this.manager.findOne({
      where: { user_name: new_user.user_name },
    });
    if (d_user) {
      return false;
    } else {
      try {
        await this.manager.save(new_user);
      } catch (error) {
        return false;
      }
      return true;
    }
  }
}
