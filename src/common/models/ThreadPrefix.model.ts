import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Thread from './Thread.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class ThreadPrefix extends Model {
  @Column({ type: DataType.STRING(50) })
  declare prefix: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare display_style: string;

  @HasMany(() => Thread)
  declare threads: Thread[];
}
