import { EntityModel } from '@midwayjs/orm';
import {
  // Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { CoffeeProductEntity } from './Product';
import { CoffeeUserEntity } from './User';
import { CoffeeUserAddressEntity } from './UserAddress';

@EntityModel()
export class CoffeeOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  order_create_time: Date;

  @OneToOne(() => CoffeeUserAddressEntity)
  address: CoffeeUserAddressEntity;

  @ManyToMany(() => CoffeeProductEntity, product => product.product_order)
  @JoinTable()
  product: CoffeeProductEntity[];

  @OneToOne(() => CoffeeUserEntity, { cascade: true })
  @JoinColumn()
  user: CoffeeUserEntity;
}
