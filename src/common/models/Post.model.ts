import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Thread from './Thread.model';
import Forum from './Fourm.model';
import User from './User.model';
import Attachment from './Attachment.model';
import PostLike from './PostLike.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Post extends Model {
  @ForeignKey(() => Thread)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare thread_id: number;

  //   @Column({ type: DataType.INTEGER, allowNull: true })
  //   declare reply_to: number;

  @ForeignKey(() => Forum)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare forum_id: number;

  //   @Column({ type: DataType.STRING(255) })
  //   declare subject: string;

  //   @Column({ type: DataType.STRING, allowNull: true })
  //   declare icon: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  //   @Column({ type: DataType.STRING, allowNull: true })
  //   declare username: string;

  @Column({ type: DataType.TEXT })
  declare message: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare ip_address: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare include_sig: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare edit_user_id: number;

  @Column({ type: DataType.DATE, allowNull: true })
  declare edit_time: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare edit_reason: string;

  @BelongsTo(() => Thread, 'thread_id')
  declare thread: Thread;

  @BelongsTo(() => Forum, 'forum_id')
  declare forum: Forum;

  @BelongsTo(() => User, 'user_id')
  declare author: User;

  @BelongsTo(() => User, 'edit_user_id')
  declare editor: User;

  @HasMany(() => Attachment)
  declare attachments: Attachment[];

  @HasMany(() => PostLike)
  declare post_likes: PostLike[];
}
