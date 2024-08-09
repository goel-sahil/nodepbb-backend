import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  post_id: number;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 255 })
  filetype: string;

  @Column({ type: 'int' })
  filesize: number;

  @Column({ length: 255 })
  attachname: string;

  @Column({ type: 'int', default: 0 })
  downloads: number;

  @ManyToOne(() => Post, (post) => post.attachments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.attachments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
