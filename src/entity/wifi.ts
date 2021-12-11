import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({ name: 'wifi' })
export class WifiEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ssid: string;

  @Column()
  pwd: string;

  @Column()
  updateTime: Date;
}
