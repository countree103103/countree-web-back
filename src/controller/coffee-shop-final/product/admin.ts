// import { CoffeeProductOptEntity } from './../../../entity/coffee-shop-final/ProductOpt';
import { CoffeeProductEntity } from './../../../entity/coffee-shop-final/Product';
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
import CoffeeProductService from '../../../service/coffee-shop-final/productService';
import { initEntityFromObject } from '../../../util';
import { CoffeeProductOptEntity } from '../../../entity/coffee-shop-final/ProductOpt';

@Controller('/coffee/admin/product')
@Provide()
export class CoffeeProductAdminController {
  @Inject()
  productService: CoffeeProductService;

  @Get('/')
  async getProductList(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<CoffeeProductEntity[]> {
    return await this.productService.getAllProducts();
  }

  @Post('/add')
  async addProduct(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<any> {
    const new_product = new CoffeeProductEntity();
    const new_product_opt = new CoffeeProductOptEntity();
    initEntityFromObject(new_product, body);
    initEntityFromObject(new_product_opt, body.product_opt);
    new_product.product_opt = [new_product_opt];
    // console.log(new_product);

    return this.productService.addProduct(new_product);
  }

  @Post('/update')
  async update(
    @Body(ALL) body: Record<string, any>
    // @Session(ALL) session: Record<string, any>
  ) {
    // const u_product = body;
    console.log(body);
    // initEntityFromObject(u_product, body);
    try {
      return await this.productService.updateProduct(body);
    } catch (error) {
      return false;
    }
  }
}
