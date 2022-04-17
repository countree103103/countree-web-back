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
import { CoffeeUserAddressEntity } from '../../../entity/coffee-shop-final/UserAddress';

@Controller('/coffee/admin/user')
@Provide()
export class CoffeeUserAdminController {
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
      user,
      true
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
      sessions.session.user = null;
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

  @Get('/')
  async getAllUser(@Session(ALL) session: Record<string, any>) {
    if (!session.session.user) {
      return false;
    }

    try {
      return await this.userService.getAllUser();
    } catch (error) {
      console.log(error);
      return false;
    }
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
    if (!user) {
      return false;
    }
    try {
      initEntityFromObject(user, body);
      const addressArr: CoffeeUserAddressEntity[] = [];
      const addresses = JSON.parse(body.address);
      console.log(addresses);
      if (addresses) {
        for (const address of addresses) {
          const new_address = new CoffeeUserAddressEntity();
          new_address.address = address.address;
          new_address.tel = address.tel;
          new_address.name = address.name;
          addressArr.push(new_address);
        }
        user.address = addressArr;
      }
      const result = await this.userService.updateUser(user);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
