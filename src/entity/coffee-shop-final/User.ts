import { CoffeeUserAddressEntity } from './UserAddress';
import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class CoffeeUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_name: string;

  @Column()
  user_password: string;

  @CreateDateColumn()
  register_date: Date;

  @UpdateDateColumn()
  last_login_date: Date;

  @Column()
  last_login_ip: string;

  @Column({ enum: ['男', '女', '未知'], default: '未知' })
  user_gender: string;

  @Column({ default: '' })
  user_avatar: string;

  @OneToMany(() => CoffeeUserAddressEntity, address => address.user)
  address: CoffeeUserAddressEntity[];
}
