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
import { initEntityFromObject } from '../../../util';
import { CoffeeOrderEntity } from '../../../entity/coffee-shop-final/Order';
import CoffeeOrderService from '../../../service/coffee-shop-final/orderService';
import { CoffeeUserEntity } from '../../../entity/coffee-shop-final/User';

@Controller('/coffee/order')
@Provide()
export class CoffeeOrderController {
  @Inject()
  orderService: CoffeeOrderService;

  @Get('/')
  async getOrderList(): Promise<CoffeeOrderEntity[]> {
    return await this.orderService.getAllOrder();
  }

  @Post('/add')
  async addOrder(
    @Body(ALL) body: Record<string, any>,
    @Session('user') user: CoffeeUserEntity
  ): Promise<any> {
    if (!user) {
      return false;
    }
    const new_order = new CoffeeOrderEntity();
    initEntityFromObject(new_order, body);
    new_order.user = user;
    new_order.product_list = body.product_list;
    new_order.payment_type = body.payment_type;
    new_order.order_status = '待确认';
    new_order.address = body.address;

    let num = 0;
    let sum = 0;
    for (const product of JSON.parse(body.product_list)) {
      num += product.product_num;
      sum += product.product_price_now * product.product_num;
    }
    new_order.order_sum = sum;
    new_order.product_num_total = num;

    return await this.orderService.addOrder(new_order);
  }
}
