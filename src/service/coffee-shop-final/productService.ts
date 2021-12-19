import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { CoffeeProductEntity } from '../../entity/coffee-shop-final/Product';
import { CoffeeProductOptEntity } from '../../entity/coffee-shop-final/ProductOpt';
import { initEntityFromObject } from '../../util';

@Provide()
export default class CoffeeProductService {
  @InjectEntityModel(CoffeeProductEntity)
  productModel: Repository<CoffeeProductEntity>;

  @InjectEntityModel(CoffeeProductOptEntity)
  productOptModel: Repository<CoffeeProductOptEntity>;

  async getAllProducts(select?: (keyof CoffeeProductEntity)[]): Promise<any> {
    let products: CoffeeProductEntity[];
    if (select) {
      products = await this.productModel.find({
        relations: ['product_opt'],
        select: select,
      });
    } else {
      products = await this.productModel.find({
        relations: ['product_opt'],
      });
    }
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
      console.log(error);
      return false;
    }
  }

  async updateProduct(body: any): Promise<any> {
    try {
      const product = await this.productModel.findOne({
        where: { id: body._id },
        // relations: ['product_opt'],
      });
      const arr: CoffeeProductOptEntity[] = [];
      if (body.product_opt) {
        for (const i of JSON.parse(body.product_opt)) {
          const new_opt = new CoffeeProductOptEntity();
          new_opt.title = i.title;
          new_opt.attr = i.attr;
          arr.push(new_opt);
        }
      }
      if (product) {
        initEntityFromObject(product, body);
        // product.product_price_before = u_product.product_price_before;
        if (body.product_opt) {
          product.product_opt = arr;
        }
        return await this.productModel.save(product);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getProduct(
    where: Record<string, any>
  ): Promise<CoffeeProductEntity | false> {
    try {
      return await this.productModel.findOne({ where: where ? where : null });
    } catch (error) {
      return false;
    }
  }
}
