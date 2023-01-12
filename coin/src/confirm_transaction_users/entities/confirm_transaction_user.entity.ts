import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {TransactionsWaiting} from '../../transactions_waiting/entities/transactions_waiting.entity';
import {ConfirmTransaction} from '../../confirm_transactions/entities/confirm_transaction.entity';

@Entity({name: 'confirm_transaction_users', orderBy: {id: 'ASC'}, synchronize: true})
export class ConfirmTransactionUser {
    @PrimaryGeneratedColumn({comment: 'confirm_transaction_users ID'})
    id: number;

    @Column({type: 'boolean', comment: 'Status of transaction', nullable: true})
    status: boolean;

    @ManyToOne(() => User, (user) => user.confirm_transaction_user)
    @JoinColumn({name: 'user'})
    user: User;

    @ManyToOne(() => ConfirmTransaction, (confirmTransaction) => confirmTransaction.confirm_transaction_user)
    @JoinColumn({name: 'confirm_transaction'})
    confirmTransaction: ConfirmTransaction;

    @CreateDateColumn({name: 'created_at', comment: 'Created at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', comment: 'Updated at'})
    updatedAt: Date;
}
