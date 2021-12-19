import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  // ManyToOne,
} from 'typeorm';
// import { CoffeeOrderEntity } from './Order';
import { CoffeeProductOptEntity } from './ProductOpt';

@EntityModel()
export class CoffeeProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column({ nullable: true })
  product_des: string;

  @CreateDateColumn()
  product_create_time: any;

  @Column()
  product_price_now: number;

  @Column({ nullable: true })
  product_price_before: number;

  @UpdateDateColumn()
  product_update_time: any;

  @Column({ nullable: true })
  product_type: string;

  @Column({ nullable: true })
  product_img: string;

  @Column({ enum: ['在架', '下架'], default: '在架' })
  product_status: string;

  @OneToMany(() => CoffeeProductOptEntity, product_opt => product_opt.product, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  product_opt: CoffeeProductOptEntity[];

  //用于订单中显示的商品项目
  // @ManyToOne(() => CoffeeOrderEntity, product_order => product_order.product)
  // product_order: CoffeeOrderEntity;
}
