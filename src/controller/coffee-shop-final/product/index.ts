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

@Controller('/coffee/product')
@Provide()
export class CoffeeProductController {
  @Inject()
  productService: CoffeeProductService;

  @Get('/')
  async getProductList(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<CoffeeProductEntity[]> {
    return await this.productService.getAllProducts();
  }

  async addProduct(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<boolean> {
    // const new_product = new CoffeeProductEntity();
    console.log(body);
    return true;
  }
}
