import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'transactions_waiting', timestamps: true, deletedAt: true })
export class TransactionsWaiting extends Model<TransactionsWaiting> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;


    @Column({ allowNull: false})
    from: number;

    @Column({ allowNull: false })
    to: number;

    @Column({ type: 'float', allowNull: false })
    value: number;

    @Column({ allowNull: false })
    status: boolean;
}