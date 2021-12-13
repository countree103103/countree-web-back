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
// import { initEntityFromBody } from '../../../util';

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

  @Post('/add')
  async addProduct(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<any> {
    const new_product = new CoffeeProductEntity();
    // const new_product_opt = new CoffeeProductOptEntity();
    new_product.product_name = body.product_name;
    new_product.product_des = body.product_des;
    new_product.product_img = body.product_img;
    new_product.product_price_before = body.product_price_before;
    new_product.product_price_now = body.product_price_now;
    new_product.product_type = body.product_type;
    new_product.product_status = body.product_status;
    // initEntityFromBody(new_product, body);
    // new_product.id = 3;
    // initEntityFromBody(new_product_opt, body);

    // console.log(new_product);

    return this.productService.addProduct(new_product);
  }
}
