import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeeProductEntity } from './Product';
// import { CoffeeProductEntity } from './Product';

@EntityModel()
export class CoffeeProductOptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  temp: string;

  @Column()
  esp: string;

  @Column()
  other: string;

  @OneToOne(() => CoffeeProductEntity, product => product.product_opt, {
    cascade: true,
  })
  product: CoffeeProductEntity;
}
