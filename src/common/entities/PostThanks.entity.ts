import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity('post_thanks')
export class PostThanks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.thanks)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.thanks_received)
  @JoinColumn({ name: 'recipient_id' })
  recipient: User;

  @ManyToOne(() => User, (user) => user.thanks_given)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
