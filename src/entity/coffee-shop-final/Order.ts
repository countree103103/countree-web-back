import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
  // OneToOne,
  CreateDateColumn,
  // JoinColumn,
  Column,
  ManyToOne,
  // OneToMany,
} from 'typeorm';
// import { CoffeeProductEntity } from './Product';
import { CoffeeUserEntity } from './User';
// import { CoffeeUserAddressEntity } from './UserAddress';

@EntityModel()
export class CoffeeOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  order_create_time: Date;

  // @OneToOne(() => CoffeeUserAddressEntity, address => address.order, {
  //   cascade: true,
  // })
  @Column()
  address: string;

  // @OneToMany(() => CoffeeProductEntity, product => product.product_order, {
  //   cascade: true,
  // })
  // product: CoffeeProductEntity[];

  //stringify的object
  @Column()
  product_list: string;

  @Column({ enum: ['微信支付', '支付宝支付'] })
  payment_type: string;

  @Column({ enum: ['待确认', '准备中', '配送中', '订单完成', '订单取消'] })
  order_status: string;

  @Column()
  order_sum: number;

  @Column()
  product_num_total: number;

  @ManyToOne(() => CoffeeUserEntity, user => user.order, { cascade: true })
  // @JoinColumn()
  user: CoffeeUserEntity;
}
