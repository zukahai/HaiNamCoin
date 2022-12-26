import {BelongsTo, Column, Model, Table} from 'sequelize-typescript';
import {TransactionsWaiting} from "../../transactions_waiting/entities/transactions_waiting.entity";

@Table({ tableName: 'comfirm_transactions', timestamps: true, deletedAt: true })
export class ComfirmTransaction extends Model<ComfirmTransaction> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    trasaction_id: number;
//

    @BelongsTo(() => TransactionsWaiting, {foreignKey: 'trasaction_id', targetKey: 'id'})
    transactionsWaiting: TransactionsWaiting;

}