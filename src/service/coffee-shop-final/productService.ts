import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { getRepository, Repository } from 'typeorm';
import { CoffeeProductEntity } from '../../entity/coffee-shop-final/Product';

@Provide()
export default class CoffeeProductService {
  @InjectEntityModel(CoffeeProductEntity)
  productModel: CoffeeProductEntity;

  manager: Repository<CoffeeProductEntity>;

  CoffeeProductService(): void {
    this.manager = getRepository(CoffeeProductEntity);
  }

  async getAllProducts(): Promise<CoffeeProductEntity[]> {
    const products: CoffeeProductEntity[] = await this.manager.find();
    return products;
  }
}
