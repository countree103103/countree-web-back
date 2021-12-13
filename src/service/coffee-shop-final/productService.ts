import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { CoffeeProductEntity } from '../../entity/coffee-shop-final/Product';

@Provide()
export default class CoffeeProductService {
  @InjectEntityModel(CoffeeProductEntity)
  productModel: Repository<CoffeeProductEntity>;

  async getAllProducts(): Promise<any> {
    const products: CoffeeProductEntity[] = await this.productModel.find();
    if (products) {
      return products;
    } else {
      return 'nothing';
    }
  }

  async addProduct(new_product: CoffeeProductEntity) {
    try {
      await this.productModel.save(new_product);
      return true;
    } catch (error) {
      return false;
    }
  }
}
