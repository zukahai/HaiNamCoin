import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {TransactionsWaiting} from "../../transactions_waiting/entities/transactions_waiting.entity";

@Entity({name: "join_confirm_transaction", orderBy: {id: "ASC"}, synchronize: true})
export class JoinConfirmTransaction {
    @PrimaryGeneratedColumn({comment: "TransactionsWaiting ID"})
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    user_id: User;

    @ManyToOne(() => TransactionsWaiting, transactionsWaiting => transactionsWaiting.id)
    @JoinColumn({name: "transaction_waiting_id"})
    transaction_waiting_id: TransactionsWaiting;

    @Column({type: 'timestamp', comment: "Time Join"})
    time_join: Date;

    @CreateDateColumn({name: "created_at", comment: "Created at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", comment: "Updated at"})
    updatedAt: Date;
}


