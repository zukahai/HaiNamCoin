import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { JoinConfirmTransaction } from '../../join_confirm_transactions/entities/join_confirm_transaction.entity';
import { ConfirmTransaction } from '../../confirm_transactions/entities/confirm_transaction.entity';
import { ConfirmTransactionUser } from '../../confirm_transaction_users/entities/confirm_transaction_user.entity';

@Entity({ name: 'transactions_waiting', orderBy: { id: 'ASC' }, synchronize: true })
export class TransactionsWaiting {
    @PrimaryGeneratedColumn({ comment: 'TransactionsWaiting ID' })
    id: number;

    @ManyToOne(() => User, (user) => user.transactions_waiting_from)
    @JoinColumn({ name: 'from' })
    from: User;

    @ManyToOne(() => User, (user) => user.transactions_waiting_to)
    @JoinColumn({ name: 'to' })
    to: User;

    @Column({ type: 'float', comment: 'Amount of block' })
    value: number;

    @Column({ type: 'int', comment: 'Status of transaction' })
    status: number;

    @Column({ type: 'varchar', length: 255, comment: 'nonce of block' })
    nonce: string;

    @Column({ type: 'varchar', length: 255, comment: 'permutation of block nonce ' })
    permutation_nonce: string;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;

    @OneToMany(() => JoinConfirmTransaction, (joinConfirmTransaction) => joinConfirmTransaction.transaction_waiting)
    join_confirm_transaction: JoinConfirmTransaction[];

    @OneToMany(() => ConfirmTransactionUser, (confirmTransactionUser) => confirmTransactionUser.transaction_waiting)
    confirm_transaction_user: ConfirmTransactionUser[];

    @OneToMany(() => ConfirmTransaction, (confirmTransaction) => confirmTransaction.transaction_waiting)
    confirm_transactions: ConfirmTransaction[];
}
