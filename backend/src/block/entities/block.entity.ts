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

@Entity({ name: 'blocks', orderBy: { id: 'ASC' }, synchronize: true })
export class Block {
    @PrimaryGeneratedColumn({ comment: 'Block ID' })
    id: number;

    @ManyToOne(() => User, (user) => user.block_from)
    @JoinColumn({ name: 'from' })
    from: User;

    @ManyToOne(() => User, (user) => user.block_to)
    @JoinColumn({ name: 'to' })
    to: User;

    @Column({ type: 'float', comment: 'Amount of block' })
    value: number;

    @Column({ type: 'varchar', length: 255, comment: 'Description' })
    description: string;

    @Column({ type: 'varchar', name: 'pre_hash_code', length: 255, comment: 'PreHashCode of block' })
    preHashCode: string;

    @Column({ type: 'varchar', name: 'hash_code', length: 255, comment: 'HashCode of block' })
    hashCode: string;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;
}
