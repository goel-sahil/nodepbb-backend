import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Post from './Post.model';
import User from './User.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class PostLike extends Model {
  @ForeignKey(() => Post)
  @Column
  declare post_id: number;

  @BelongsTo(() => Post, 'post_id')
  declare post: Post;

  @ForeignKey(() => User)
  @Column
  declare recipient_id: number;

  @BelongsTo(() => User, 'recipient_id')
  declare recipient: User;

  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @BelongsTo(() => User, 'user_id')
  declare user: User;
}
