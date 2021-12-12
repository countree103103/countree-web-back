import { CoffeeUserEntity } from './../../../entity/coffee-shop-final/User';
import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Session,
} from '@midwayjs/decorator';
import CoffeeUserService from '../../../service/coffee-shop-final/userService';

@Controller('/coffee/user')
@Provide()
export class CoffeeUserController {
  @Inject()
  userService: CoffeeUserService;

  @Post('/login')
  login(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): boolean {
    const user = new CoffeeUserEntity();
    user.user_name = body.user_name;
    user.user_password = body.user_password;
    const result = this.userService.login(user);
    if (result) {
      //保存登陆状态
      session.user = result;
      return true;
    } else {
      return false;
    }
  }

  @Post('/register')
  async register(@Body(ALL) body: Record<string, any>) {
    const new_user = new CoffeeUserEntity();
    //TODO: create_date和last_login_date逻辑
    new_user.user_name = body.user_name;
    new_user.user_gender = body.user_name;
    new_user.user_password = body.user_name;
    const result = this.userService.register(new_user);
    return result;
  }

  @Post('getUserInfo')
  async getUserInfo(
    @Session('user') user: CoffeeUserEntity
  ): Promise<boolean | Record<string, unknown>> {
    if (user) {
      return {
        user_name: user.user_name,
        user_gender: user.user_gender,
        user_avatar: user.user_avatar,
        address: user.address,
      };
    } else {
      //token过期
      return false;
    }
  }
}
