import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Forum } from './Forum.entity';
import { User } from './User.entity';
import { ThreadPrefix } from './ThreadPrefix.entity';
import { Post } from './Post.entity';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  subject: string;

  @Column({ nullable: true })
  prefix_id: number;

  @Column({ type: 'int', default: null })
  user_id: number;

  @Column({ type: 'int', default: null })
  forum_id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  first_post: string;

  @Column({ type: 'text', nullable: true })
  last_post: string;

  @Column({ nullable: true })
  last_poster: string;

  @Column({ type: 'int', nullable: true })
  last_poster_id: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  replies: number;

  @Column({ default: false })
  closed: boolean;

  @Column({ default: false })
  sticky: boolean;

  @Column({ default: 0 })
  attachment_count: number;

  @ManyToOne(() => Forum, (forum) => forum.subForums)
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @ManyToOne(() => User, (user) => user.threads)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Post, (post) => post.thread)
  posts: Post[];

  @ManyToOne(() => ThreadPrefix, (prefix) => prefix.threads)
  @JoinColumn({ name: 'prefix_id' })
  thread_prefix: ThreadPrefix;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
