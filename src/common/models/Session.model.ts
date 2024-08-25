// src/sessions/session.model.ts

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './User.model';

@Table({
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'ip'],
    },
    {
      unique: true,
      fields: ['ip'],
    },
  ],
})
export default class Session extends Model {
  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  declare ip: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare user_agent: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  declare route: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare last_active: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare user_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id' })
  declare user: User;
}
