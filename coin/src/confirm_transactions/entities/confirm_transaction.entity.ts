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
import {ConfirmTransactionUser} from '../../confirm_transaction_users/entities/confirm_transaction_user.entity';

@Entity({name: 'confirm_transactions', orderBy: {id: 'ASC'}, synchronize: true})
export class ConfirmTransaction {
    @PrimaryGeneratedColumn({comment: 'confirm_transaction ID'})
    id: number;

    @Column({type: 'varchar', length: 255, comment: 'nonce of block', nullable: true})
    nonce: string;

    @ManyToOne(() => TransactionsWaiting, (transactionsWaiting) => transactionsWaiting.confirm_transactions)
    @JoinColumn({name: 'transaction_waiting'})
    transaction_waiting: TransactionsWaiting;

    @ManyToOne(() => User, (user) => user.confirm_transactions)
    @JoinColumn({name: 'user'})
    user: User;

    @CreateDateColumn({name: 'created_at', comment: 'Created at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', comment: 'Updated at'})
    updatedAt: Date;

    @OneToMany(() => ConfirmTransactionUser, (confirmTransactionUser) => confirmTransactionUser.confirmTransaction)
    confirm_transaction_user: ConfirmTransactionUser[];
}
