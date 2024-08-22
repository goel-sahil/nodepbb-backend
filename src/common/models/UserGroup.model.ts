import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import User from './User.model';

@Table({ underscored: true, timestamps: true })
export default class UserGroup extends Model {
  @Column({ type: DataType.STRING(120), allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  declare name_style: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare display_order: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare group_type: number;

  @HasMany(() => User, { foreignKey: 'user_group_id' })
  declare users: User[];
}
