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
import { User } from '../../user/entities/user.entity';
import { TransactionsWaiting } from '../../transactions_waiting/entities/transactions_waiting.entity';

@Entity({ name: 'confirm_transactions', orderBy: { id: 'ASC' }, synchronize: true })
export class ConfirmTransaction {
    @PrimaryGeneratedColumn({ comment: 'confirm_transaction ID' })
    id: number;

    @Column({ type: 'varchar', length: 255, comment: 'nonce of block' })
    nonce: string;

    @ManyToOne(() => TransactionsWaiting, (transactionsWaiting) => transactionsWaiting.confirm_transactions)
    @JoinColumn({ name: 'transaction_waiting' })
    transaction_waiting: TransactionsWaiting;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;
}
