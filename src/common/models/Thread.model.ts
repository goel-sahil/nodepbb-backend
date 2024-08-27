import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Forum from './Fourm.model';
import User from './User.model';
import ThreadPrefix from './ThreadPrefix.model';
import Post from './Post.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Thread extends Model {
  @Column({ type: DataType.STRING(255) })
  declare subject: string;

  @ForeignKey(() => ThreadPrefix)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare prefix_id: number;

  @ForeignKey(() => Forum)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare forum_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  //   @Column({ type: DataType.TEXT, allowNull: true })
  //   declare first_post: string;

  //   @Column({ type: DataType.TEXT, allowNull: true })
  //   declare last_post: string;

  //   @Column({ type: DataType.STRING, allowNull: true })
  //   declare last_poster: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare last_poster_id: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare views: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare replies: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare closed: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare sticky: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare attachment_count: number;

  @BelongsTo(() => Forum, 'forum_id')
  declare forum: Forum;

  @BelongsTo(() => User, 'user_id')
  declare author: User;

  @BelongsTo(() => User, 'last_poster_id')
  declare last_poster: User;

  @BelongsTo(() => ThreadPrefix, 'prefix_id')
  declare thread_prefix: ThreadPrefix;

  @HasMany(() => Post)
  declare posts: Post[];
}
