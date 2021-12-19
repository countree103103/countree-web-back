import { CoffeeUserEntity } from './../../entity/coffee-shop-final/User';
import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';

@Provide()
export default class CoffeeUserService {
  @InjectEntityModel(CoffeeUserEntity)
  userModel: Repository<CoffeeUserEntity>;

  async getAllUser(): Promise<CoffeeUserEntity[]> {
    const users: CoffeeUserEntity[] = await this.userModel.find();
    return users;
  }

  async updateUser(userUpdated: CoffeeUserEntity) {
    try {
      return await this.userModel.save(userUpdated);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async login(user: CoffeeUserEntity): Promise<boolean | CoffeeUserEntity> {
    const d_user: CoffeeUserEntity = await this.userModel.findOne({
      where: { user_name: user.user_name, user_password: user.user_password },
    });
    return d_user ? d_user : false;
  }

  async register(new_user: CoffeeUserEntity): Promise<boolean> {
    const d_user: CoffeeUserEntity = await this.userModel.findOne({
      where: { user_name: new_user.user_name },
    });
    if (d_user) {
      return false;
    } else {
      try {
        await this.userModel.save(new_user);
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    }
  }
}
