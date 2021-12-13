import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CoffeeUserEntity } from './User';

@EntityModel()
export class CoffeeUserAddressEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  tel: string;

  @Column()
  address: string;

  @ManyToOne(() => CoffeeUserEntity, user => user.address, { cascade: true })
  user: CoffeeUserEntity;
}
