import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Block } from '../../block/entities/block.entity';
import { JoinConfirmTransaction } from '../../join_confirm_transactions/entities/join_confirm_transaction.entity';
import { TransactionsWaiting } from '../../transactions_waiting/entities/transactions_waiting.entity';
import { ConfirmTransactionUser } from '../../confirm_transaction_users/entities/confirm_transaction_user.entity';

@Entity({ name: 'users', orderBy: { id: 'ASC' }, synchronize: true })
export class User {
    @PrimaryGeneratedColumn({ name: 'id', comment: 'User ID' })
    id: number;

    @Column({ type: 'varchar', length: 255, comment: 'Name of user' })
    name: string;

    @Column({ type: 'varchar', length: 255, comment: 'Email of user', unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, comment: 'private key of user' })
    private_key: string;

    @Column({ type: 'varchar', length: 255, comment: 'public key of user' })
    public_key: string;

    @Column({ type: 'text', comment: 'Password of user' })
    password: string;

    @Column({ type: 'varchar', length: 255, comment: 'Role of user', default: 'user' })
    role: string;

    @Column({ type: 'boolean', default: true, comment: 'Is activated' })
    isActivated: boolean;

    @Column({ type: 'text', nullable: true, comment: 'Refresh token' })
    refreshToken: string;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;

    @OneToMany(() => Block, (block) => block.from)
    block_from: Block[];

    @OneToMany(() => Block, (block) => block.to)
    block_to: Block[];

    @OneToMany(() => TransactionsWaiting, (transactionsWaiting) => transactionsWaiting.from)
    transactions_waiting_from: TransactionsWaiting[];

    @OneToMany(() => TransactionsWaiting, (transactionsWaiting) => transactionsWaiting.to)
    transactions_waiting_to: TransactionsWaiting[];

    @OneToOne(() => JoinConfirmTransaction, (joinConfirmTransaction) => joinConfirmTransaction.user)
    join_confirm_transaction: JoinConfirmTransaction;

    @OneToMany(() => ConfirmTransactionUser, (confirmTransactionUser) => confirmTransactionUser.user)
    confirm_transaction_user: ConfirmTransactionUser[];
}
