import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CoffeeOrderEntity } from './Order';
import { CoffeeProductOptEntity } from './ProductOpt';

@EntityModel()
export class CoffeeProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_des: string;

  @CreateDateColumn()
  product_create_time: any;

  @Column()
  product_price_now: number;

  @Column()
  product_price_before: number;

  @UpdateDateColumn()
  product_update_time: any;

  @Column()
  product_type: string;

  @Column()
  product_img: string;

  @Column({ enum: ['在架', '下架'] })
  product_status: string;

  @OneToOne(() => CoffeeProductOptEntity, product_opt => product_opt.product)
  @JoinColumn()
  product_opt: CoffeeProductOptEntity;

  //用于订单中显示的商品项目
  @ManyToOne(() => CoffeeOrderEntity, product_order => product_order.product, {
    cascade: true,
  })
  product_order: CoffeeOrderEntity;
}
