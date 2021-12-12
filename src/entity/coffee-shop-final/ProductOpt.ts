import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CoffeeProductEntity } from './Product';

@EntityModel({ name: 'coffee-Product' })
export class CoffeeProductOptEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'temp' })
  temp: string;

  @Column({ name: 'esp' })
  esp: string;

  @Column({ name: 'other' })
  other: string;

  @OneToOne(() => CoffeeProductEntity, product => product.product_opt)
  product: CoffeeProductEntity;
}
