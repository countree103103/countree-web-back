import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { CoffeeProductEntity } from '../../entity/coffee-shop-final/Product';
import { CoffeeProductOptEntity } from '../../entity/coffee-shop-final/ProductOpt';

@Provide()
export default class CoffeeProductService {
  @InjectEntityModel(CoffeeProductEntity)
  productModel: Repository<CoffeeProductEntity>;

  @InjectEntityModel(CoffeeProductOptEntity)
  productOptModel: Repository<CoffeeProductOptEntity>;

  async getAllProducts(): Promise<any> {
    const products: CoffeeProductEntity[] = await this.productModel.find();
    if (products) {
      return products;
    } else {
      return 'nothing';
    }
  }

  async addProduct(
    new_product: CoffeeProductEntity,
    new_product_opt?: CoffeeProductOptEntity
  ) {
    try {
      await this.productModel.save(new_product);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getProduct(
    where: Record<string, any>
  ): Promise<CoffeeProductEntity | boolean> {
    try {
      return await this.productModel.findOne({ where: where ? where : null });
    } catch (error) {
      return false;
    }
  }
}
