import { EntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({ name: 'lyb' })
export class Lyb {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'guest_name' })
  guest_name: string;

  @Column({ name: 'guest_message' })
  guest_message: string;

  @Column({ name: 'time' })
  time: Date;
}
