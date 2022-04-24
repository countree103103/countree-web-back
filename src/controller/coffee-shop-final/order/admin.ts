import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
  Session,
  Get,
} from '@midwayjs/decorator';
import { CoffeeOrderEntity } from '../../../entity/coffee-shop-final/Order';
import CoffeeOrderService from '../../../service/coffee-shop-final/orderService';

@Controller('/coffee/admin/order')
@Provide()
export class CoffeeOrderAdminController {
  @Inject()
  orderService: CoffeeOrderService;

  @Get('/')
  async getAllOrder(): Promise<CoffeeOrderEntity[]> {
    return this.orderService.getAllOrder();
  }

  @Post('/update')
  async update(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ) {
    if (!session.user) {
      return false;
    }

    // const u_product = body;
    // initEntityFromObject(u_product, body);
    try {
      return await this.orderService.updateOrder(body);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
