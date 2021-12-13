import { CoffeeUserAddressEntity } from './UserAddress';
import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@EntityModel()
export class CoffeeUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_password: string;

  @CreateDateColumn()
  register_date: Date;

  @Column()
  last_login_date: Date;

  @Column()
  last_login_ip: string;

  @Column({ enum: ['男', '女', '未知'] })
  user_gender: string;

  @Column()
  user_avatar: string;

  @OneToMany(() => CoffeeUserAddressEntity, address => address.user)
  address: CoffeeUserAddressEntity[];
}
