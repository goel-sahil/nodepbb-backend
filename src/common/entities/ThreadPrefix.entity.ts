import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Thread } from './Thread.entity';

@Entity('thread_prefixes')
export class ThreadPrefix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  prefix: string;

  @Column({ length: 100, nullable: true })
  display_style: string;

  @OneToMany(() => Thread, (thread) => thread.thread_prefix)
  threads: Thread[];
}
