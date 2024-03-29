import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { FontUser } from '../../font_users/entities/font_user.entity';

@Entity({ name: 'fonts', orderBy: { id: 'ASC' }, synchronize: true })
export class Font {
    @PrimaryGeneratedColumn({ comment: 'Font ID' })
    id: number;

    @Column({ type: 'varchar', length: 255, comment: 'Font name' })
    name: string;

    @Column({ type: 'varchar', length: 255, comment: 'path image font', nullable: true })
    path_image: string;

    @Column({ type: 'varchar', length: 255, comment: 'link_download', nullable: true })
    link_download: string;

    @Column({ type: 'int', comment: 'price' })
    price: number;

    @Column({ type: 'int', comment: 'price license' })
    price_license: number;

    @ManyToOne(() => User, (user) => user.fonts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.font)
    transactions: Transaction[];

    @OneToMany(() => FontUser, (font_user) => font_user.font)
    font_users: FontUser[];
}
