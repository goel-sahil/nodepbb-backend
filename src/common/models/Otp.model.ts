import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import User from './User.model';

@Table({
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'otp_type'],
    },
  ],
})
export default class Otp extends Model {
  @Column({ type: DataType.STRING(10), allowNull: false })
  declare otp: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare otp_type: number;

  @BelongsTo(() => User, { foreignKey: 'user_id' })
  declare user: User;
}
