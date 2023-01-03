import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Font} from "../../fonts/entities/font.entity";

@Entity({ name: 'transactions', orderBy: { id: 'ASC' }, synchronize: true })
export class Transaction {
    @PrimaryGeneratedColumn({ comment: 'Transaction ID' })
    id: number;

    @ManyToOne(() => User, (user) => user.from)
    @JoinColumn({ name: 'from_id' })
    from: User;

    @ManyToOne(() => User, (user) => user.to)
    @JoinColumn({ name: 'to_id' })
    to: User;

    @ManyToOne(() => Font, (font) => font.transactions)
    @JoinColumn({ name: 'font_id' })
    font: Font;

    @Column({ type: 'int', comment: 'Price of the font' })
    price: number;

    @Column({ type: 'int', comment: 'Transaction id 1' })
    transaction_id_1: number;

    @Column({ type: 'int', comment: 'Transaction id 2' })
    transaction_id_2: number;

    @Column({ type: 'int', comment: 'Status of the transaction' })
    status: number;

}
