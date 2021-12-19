import { CoffeeUserEntity } from './../../../entity/coffee-shop-final/User';
import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  RequestIP,
  Session,
} from '@midwayjs/decorator';
import CoffeeUserService from '../../../service/coffee-shop-final/userService';
import { initEntityFromObject } from '../../../util';

@Controller('/coffee/user')
@Provide()
export class CoffeeUserController {
  @Inject()
  userService: CoffeeUserService;

  @Post('/login')
  async login(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<boolean> {
    const user = new CoffeeUserEntity();
    initEntityFromObject(user, body);
    const result: boolean | CoffeeUserEntity = await this.userService.login(
      user
    );
    if (result) {
      //保存登陆状态
      session.user = result;
      return true;
    } else {
      return false;
    }
  }

  @Post('/logout')
  logout(@Session(ALL) sessions: any): boolean {
    try {
      sessions.user = null;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Post('/register')
  async register(
    @Body(ALL) body: Record<string, any>,
    @RequestIP() clientIP: string
  ): Promise<boolean> {
    const new_user: CoffeeUserEntity = new CoffeeUserEntity();
    initEntityFromObject(new_user, body);
    new_user.last_login_ip = clientIP;
    return await this.userService.register(new_user);
  }

  @Get('/getUserInfo')
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

  @Post('/updateUserInfo')
  async updateUserInfo(
    @Body(ALL) body: Record<string, any>,
    @Session('user') user: CoffeeUserEntity
  ) {
    try {
      initEntityFromObject(user, body);
      const result = await this.userService.updateUser(user);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
