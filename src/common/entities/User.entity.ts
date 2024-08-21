import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserGroup } from './UserGroup.entity';
import { UserTitle } from './UserTitle.entity';
import { Post } from './Post.entity';
import { Thread } from './Thread.entity';
import { Attachment } from './Attachment.entity';
import { PostThanks } from './PostThanks.entity';
import { Otp } from './Otp.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'int', default: null })
  user_group_id: number;

  @Column({ type: 'int', default: null })
  user_title_id: number;

  @Column({ type: 'int', default: 0 })
  postnum: number;

  @Column({ type: 'int', default: 0 })
  threadnum: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'int', default: 0 })
  lastactive: number;

  @Column({ type: 'int', default: 0 })
  lastvisit: number;

  @Column({ type: 'int', default: 0 })
  lastpost: number;

  @Column({ type: 'text', nullable: true })
  signature: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  regip: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastip: string;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ type: 'int', default: 0 })
  timeonline: number;

  @Column({ type: 'int', default: 0 })
  upload: number;

  @Column({ type: 'int', default: 0 })
  download: number;

  @Column({ type: 'int', default: 0 })
  upkb: number;

  @Column({ type: 'int', default: 0 })
  downkb: number;

  @Column({ type: 'int', default: 0 })
  thanks: number;

  @Column({ type: 'int', default: 0 })
  gender: number;

  @Column({ type: 'int', default: 0 })
  status: number;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.user)
  @JoinColumn({ name: 'user_group_id' })
  user_group: UserGroup;

  @ManyToOne(() => UserTitle, (userTitle) => userTitle.user)
  @JoinColumn({ name: 'user_title_id' })
  user_title: UserTitle;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => Attachment, (attachment) => attachment.user)
  attachments: Attachment[];

  @OneToMany(() => PostThanks, (thanks) => thanks.user)
  thanks_given: PostThanks[]; // Thanks given by the user

  @OneToMany(() => PostThanks, (thanks) => thanks.recipient)
  thanks_received: PostThanks[]; // Thanks received by the user

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
