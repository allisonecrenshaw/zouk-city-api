import { Entity, Column, TableInheritance } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
