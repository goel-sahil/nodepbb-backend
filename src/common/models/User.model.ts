import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Otp from './Otp.model';
import UserGroup from './UserGroup.model';
import UserTitle from './UserTitle.model';

@Table({ underscored: true, timestamps: true })
export default class User extends Model {
  @Column({ type: DataType.STRING(255) })
  declare name: string;

  @Column({ type: DataType.STRING(255) })
  declare username: string;

  @Column({ type: DataType.STRING(255) })
  declare email: string;

  @Column({ type: DataType.STRING(255) })
  declare password: string;

  @ForeignKey(() => UserGroup)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare user_group_id: number;

  @ForeignKey(() => UserTitle)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare user_title_id: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_posts: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_threads: number;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare avatar: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare last_active: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare last_visit: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare last_post_id: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare signature: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare register_ip: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare last_ip: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  declare date_of_birth: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare time_online: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_uploads: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_downloads: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_uploaded_size: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_downloaded_size: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare total_likes: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare gender: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare status: number;

  @BelongsTo(() => UserGroup, { foreignKey: 'user_group_id' })
  declare user_group: UserGroup;

  @BelongsTo(() => UserTitle, { foreignKey: 'user_title_id' })
  declare user_title: UserTitle;

  @HasMany(() => Otp, { foreignKey: 'user_id' })
  declare otps: Otp[];
}
