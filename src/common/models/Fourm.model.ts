import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Category from './Category.model';
import User from './User.model';
import Post from './Post.model';
import Thread from './Thread.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Forum extends Model {
  @Column({ type: DataType.STRING(120) })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare icon: string;

  @Column({ type: DataType.INTEGER })
  declare display_order: number;

  @Column({ type: DataType.STRING, unique: true })
  declare slug: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare status: boolean;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare category_id: number;

  @ForeignKey(() => Forum)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare parent_id: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare threads: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare posts: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare last_post_id: number;

  @ForeignKey(() => Thread)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare last_thread_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare last_poster_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare last_post_subject: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare last_post_date: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_private: boolean;

  @Column({ type: DataType.STRING, defaultValue: 'public' })
  declare visibility: string;

  @BelongsTo(() => Forum, 'parent_id')
  declare parent: Forum;

  @BelongsTo(() => Post, 'last_post_id')
  declare last_post: Post;

  @BelongsTo(() => Thread, 'last_thread_id')
  declare last_thread: Thread;

  @BelongsTo(() => User, 'last_poster_id')
  declare last_poster: User;

  @BelongsTo(() => Category, 'category_id')
  declare category: Category;

  @HasMany(() => Forum, 'parent_id')
  declare sub_forums: Forum[];
}
