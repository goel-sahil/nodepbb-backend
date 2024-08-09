import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Thread } from './Thread.entity';
import { User } from './User.entity';
import { Attachment } from './Attachment.entity';
import { PostThanks } from './PostThanks.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: null })
  thread_id: number;

  @Column({ type: 'int', default: null })
  reply_to: number;

  @Column({ type: 'int', default: null })
  forum_id: number;

  @Column({ length: 255 })
  subject: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: 'int', default: null })
  user_id: number;

  @Column({ nullable: true })
  username: string;

  @Column('text')
  message: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ default: false })
  include_sig: boolean;

  @Column({ type: 'int', nullable: true })
  edit_user_id: number;

  @Column({ type: 'datetime', nullable: true })
  edit_time: Date;

  @Column({ nullable: true })
  edit_reason: string;

  @ManyToOne(() => Thread, (thread) => thread.posts)
  @JoinColumn({ name: 'thread_id' })
  thread: Thread;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Attachment, (attachment) => attachment.post)
  attachments: Attachment[];

  @OneToMany(() => PostThanks, (thanks) => thanks.post)
  thanks: PostThanks[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
