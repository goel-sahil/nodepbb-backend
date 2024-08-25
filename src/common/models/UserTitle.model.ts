import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import User from './User.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class UserTitle extends Model {
  @Column({ type: DataType.STRING(120), allowNull: false })
  declare title: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare posts: number;

  @HasMany(() => User, { foreignKey: 'user_title_id' })
  declare users: User[];
}
