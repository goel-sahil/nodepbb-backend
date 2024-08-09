import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { ForumPermission } from './ForumPermission.entity';

@Entity('user_groups')
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  type: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  name_style: string;

  @Column()
  disp_order: number;

  @Column({ default: false })
  is_banned_group: boolean;

  @Column({ default: true })
  can_view: boolean;

  @Column({ default: true })
  can_view_threads: boolean;

  @Column({ default: true })
  can_view_profiles: boolean;

  @Column({ default: true })
  can_dl_attachments: boolean;

  @Column({ default: true })
  can_post_threads: boolean;

  @Column({ default: true })
  can_post_replies: boolean;

  @Column({ default: true })
  can_post_attachments: boolean;

  @Column({ default: false })
  mod_posts: boolean;

  @Column({ default: false })
  mod_threads: boolean;

  @Column({ default: false })
  mod_edit_posts: boolean;

  @Column({ default: false })
  mod_attachments: boolean;

  @Column({ default: true })
  can_edit_posts: boolean;

  @Column({ default: true })
  can_delete_posts: boolean;

  @Column({ default: true })
  can_delete_threads: boolean;

  @Column({ default: true })
  can_edit_attachments: boolean;

  @Column({ default: true })
  can_view_member_list: boolean;

  @Column({ default: true })
  can_view_online: boolean;

  @Column({ default: false })
  can_cp: boolean;

  @Column({ default: false })
  is_super_mod: boolean;

  @Column({ default: true })
  can_search: boolean;

  @Column({ default: true })
  can_user_cp: boolean;

  @Column({ default: true })
  can_upload_avatars: boolean;

  @Column({ default: true })
  can_change_name: boolean;

  @Column({ default: false })
  can_mod_cp: boolean;

  @Column({ default: true })
  can_use_sig: boolean;

  @Column({ default: 60 })
  edit_time_limit: number;

  @Column({ default: 100 })
  max_posts: number;

  @Column({ default: true })
  show_member_list: boolean;

  @Column({ default: true })
  can_ban_users: boolean;

  @OneToMany(() => User, (user) => user.user_group)
  user: User[];

  @OneToMany(() => ForumPermission, (permission) => permission.user_group)
  forum_permissions: ForumPermission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
