import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeeProductEntity } from './Product';

@EntityModel()
export class CoffeeProductOptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ array: true })
  attr: string;

  @ManyToOne(() => CoffeeProductEntity, product => product.product_opt, {
    orphanedRowAction: 'delete',
  })
  product: CoffeeProductEntity;
}
