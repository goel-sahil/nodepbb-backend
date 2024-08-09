import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { ForumPermission } from './ForumPermission.entity';

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  display_order: number;

  @Column({ type: 'int', default: null })
  category_id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  threads: number;

  @Column({ default: 0 })
  posts: number;

  @Column({ nullable: true })
  last_post_id: number;

  @Column({ nullable: true })
  last_poster_id: number;

  @Column({ nullable: true })
  last_post_subject: string;

  @ManyToOne(() => Forum, (forum) => forum.subForums)
  @JoinColumn({ name: 'parent_id' })
  parent: Forum;

  @ManyToOne(() => Category, (category) => category.forums)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Forum, (forum) => forum.parent)
  subForums: Forum[];

  @OneToMany(() => ForumPermission, (permission) => permission.forum)
  forum_permissions: ForumPermission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
