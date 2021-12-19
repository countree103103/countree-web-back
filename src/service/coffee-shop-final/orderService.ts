import { CoffeeOrderEntity } from './../../entity/coffee-shop-final/Order';
import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { initEntityFromObject } from '../../util';

@Provide()
export default class CoffeeOrderService {
  @InjectEntityModel(CoffeeOrderEntity)
  orderModel: Repository<CoffeeOrderEntity>;

  async getAllOrder(): Promise<CoffeeOrderEntity[]> {
    const orders: CoffeeOrderEntity[] = await this.orderModel.find();
    return orders;
  }

  async addOrder(new_order: CoffeeOrderEntity) {
    try {
      await this.orderModel.save(new_order);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateOrder(body: Record<string, any>) {
    try {
      const order = await this.orderModel.findOne({ where: { id: body._id } });
      if (order) {
        initEntityFromObject(order, body);
        try {
          await this.orderModel.save(order);
          return true;
        } catch (error2) {
          console.log(error2);
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
