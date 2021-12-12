import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { CoffeeProductEntity } from './Product';
import { CoffeeProductOptEntity } from './ProductOpt';
import { CoffeeUserEntity } from './User';
import { CoffeeUserAddressEntity } from './UserAddress';

@EntityModel({ name: 'coffee-Product' })
export class CoffeeOrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @CreateDateColumn({ name: 'order_create_time' })
  order_create_time: Date;

  @OneToOne(() => CoffeeUserAddressEntity)
  address: CoffeeUserAddressEntity;

  @ManyToMany(() => CoffeeProductEntity)
  product: CoffeeProductEntity[];

  // @OneToOne(() => CoffeeUserEntity)
  // user: CoffeeUserEntity;
}
