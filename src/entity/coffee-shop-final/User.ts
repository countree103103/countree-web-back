import { CoffeeUserAddressEntity } from './UserAddress';
import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@EntityModel({ name: 'coffee-Product' })
export class CoffeeUserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_name' })
  user_name: string;

  @Column({ name: 'user_password' })
  user_password: string;

  @CreateDateColumn({ name: 'register_date' })
  register_date: Date;

  @Column({ name: 'last_login_date' })
  last_login_date: Date;

  @Column({ name: 'last_login_ip' })
  last_login_ip: string;

  @Column({ name: 'user_gender', enum: ['男', '女', '未知'] })
  user_gender: string;

  @Column({ name: 'user_avatar' })
  user_avatar: string;

  @OneToMany(() => CoffeeUserAddressEntity, address => address.user)
  address: CoffeeUserAddressEntity[];
}
