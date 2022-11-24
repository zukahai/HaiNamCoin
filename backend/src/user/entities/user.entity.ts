import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true, deletedAt: true })
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false, unique: true })
    email: string;

    @Column({ allowNull: false, type: DataType.TEXT('tiny') })
    password: string;

    @Column({ allowNull: false })
    role: string;

    @Column({ allowNull: false, defaultValue: true })
    isActivated: boolean;

    @Column({ allowNull: true })
    refreshToken: string;
}
