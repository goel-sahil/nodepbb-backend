import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Forum } from './Forum.entity';
import { UserGroup } from './UserGroup.entity';

@Entity('forum_permissions')
export class ForumPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: null })
  forum_id: number;

  @Column({ type: 'int', default: null })
  user_group_id: number;

  @Column({ default: true })
  can_view: boolean;

  @Column({ default: true })
  can_post_threads: boolean;

  @Column({ default: true })
  can_post_replies: boolean;

  @Column({ default: true })
  can_dl_attachments: boolean;

  @Column({ default: true })
  can_post_attachments: boolean;

  @Column({ default: true })
  can_edit_posts: boolean;

  @Column({ default: true })
  can_delete_posts: boolean;

  @Column({ default: true })
  can_edit_attachments: boolean;

  @Column({ default: true })
  can_delete_threads: boolean;

  @ManyToOne(() => Forum, (forum) => forum.forum_permissions)
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.forum_permissions)
  @JoinColumn({ name: 'user_group_id' })
  user_group: UserGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
