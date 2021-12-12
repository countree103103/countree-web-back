import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CoffeeUserEntity } from './User';

@EntityModel({ name: 'coffee-UserAddress' })
export class CoffeeUserAddressEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  first_name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @Column({ name: 'tel' })
  tel: string;

  @Column({ name: 'address' })
  address: string;

  @ManyToOne(() => CoffeeUserEntity, user => user.address)
  user: CoffeeUserEntity;
}
