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

@Entity({name: "transactions_waiting", orderBy: {id: "ASC"}, synchronize: true})
export class TransactionsWaiting {
    @PrimaryGeneratedColumn({comment: "TransactionsWaiting ID"})
    id: number;

    @ManyToOne(() => User, user => user.block_from)
    @JoinColumn({name: "from"})
    from: User;

    @ManyToOne(() => User, user => user.block_to)
    @JoinColumn({name: "to"})
    to: User;

    @Column({type: 'float', comment: "Amount of block"})
    value: number;

    @Column({type: 'boolean', comment: "Status of block"})
    status: boolean;

    @CreateDateColumn({name: "created_at", comment: "Created at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", comment: "Updated at"})
    updatedAt: Date;
}

