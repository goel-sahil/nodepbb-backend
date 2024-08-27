import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './User.model';
import Post from './Post.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Attachment extends Model {
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare post_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @Column({ type: DataType.STRING(255) })
  declare file_name: string;

  @Column({ type: DataType.STRING(255) })
  declare file_type: string;

  @Column({ type: DataType.INTEGER })
  declare file_size: number;

  @Column({ type: DataType.STRING(255) })
  declare attach_name: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare downloads: number;

  @BelongsTo(() => Post, 'post_id')
  declare post: Post;

  @BelongsTo(() => User, 'user_id')
  declare user: User;
}
