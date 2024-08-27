import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Forum from './Fourm.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Category extends Model {
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

  @HasMany(() => Forum, 'category_id')
  declare forums: Forum[];
}
