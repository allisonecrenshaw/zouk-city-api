import { Entity, Column, TableInheritance } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';

@Entity({ name: 'event' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Event extends BaseEntity {
  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  mainWebsiteUrl: string;

  @Column()
  registrationUrl: string;
}
