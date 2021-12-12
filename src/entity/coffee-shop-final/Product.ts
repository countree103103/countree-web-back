import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoffeeProductOptEntity } from './ProductOpt';

@EntityModel({ name: 'coffee-Product' })
export class CoffeeProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'product_name' })
  product_name: string;

  @Column({ name: 'product_des' })
  product_des: string;

  @CreateDateColumn({ name: 'product_create_time,' })
  product_create_time: Date;

  @Column({ name: 'product_price_now' })
  product_price_now: number;

  @Column({ name: 'product_price_before' })
  product_price_before: number;

  @UpdateDateColumn({ name: 'product_update_time' })
  product_update_time: Date;

  @Column({ name: 'product_type,' })
  product_type: string;

  @Column({ name: 'product_img,' })
  product_img: string;

  @Column({ name: 'product_status', enum: ['在架', '下架'] })
  product_status: string;

  @OneToOne(() => CoffeeProductOptEntity, product_opt => product_opt.product)
  // @JoinColumn({ name: 'product_opt' })
  product_opt: CoffeeProductOptEntity;
}
