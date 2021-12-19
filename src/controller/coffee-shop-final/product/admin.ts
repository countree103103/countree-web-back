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
    // return await this.productService.getAllProducts([
    //   'id',
    //   'product_create_time',
    //   'product_name',
    //   'product_price_before',
    //   'product_price_now',
    //   'product_type',
    //   'product_status',
    // ]);
    return await this.productService.getAllProducts();
  }

  @Post('/add')
  async addProduct(
    @Body(ALL) body: Record<string, any>,
    @Session(ALL) session: Record<string, any>
  ): Promise<any> {
    const new_product = new CoffeeProductEntity();
    const new_product_opt: CoffeeProductOptEntity[] = [];
    const opt = JSON.parse(body.product_opt);
    initEntityFromObject(new_product, body);
    // initEntityFromObject(new_product_opt, body.product_opt);
    // initEntityFromObject(new_product_opt, opt);
    if (opt) {
      for (const i of opt) {
        const new_opt = new CoffeeProductOptEntity();
        new_opt.title = i.title;
        new_opt.attr = i.attr;
        new_product_opt.push(new_opt);
      }
      new_product.product_opt = new_product_opt;
    } else {
      new_product.product_opt = null;
    }

    return this.productService.addProduct(new_product);
  }

  @Post('/update')
  async update(
    @Body(ALL) body: Record<string, any>
    // @Session(ALL) session: Record<string, any>
  ) {
    // const u_product = body;
    // initEntityFromObject(u_product, body);
    try {
      return await this.productService.updateProduct(body);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Post('/toggle')
  async deleteProduct(@Body(ALL) body: any) {
    if (body.id) {
      // const product: CoffeeProductEntity | false =
      //   await this.productService.getProduct({ id: body.id });
      // if (product) {
      switch (body.product_status) {
        case '在架': {
          return await this.productService.updateProduct({
            _id: body.id,
            product_status: '下架',
          });
        }
        case '下架': {
          return await this.productService.updateProduct({
            _id: body.id,
            product_status: '在架',
          });
        }
        default: {
          return false;
        }
      }
      // } else {
      // return false;
      // }
    }
  }
}
