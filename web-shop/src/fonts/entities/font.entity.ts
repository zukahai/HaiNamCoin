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

@Entity({ name: 'fonts', orderBy: { id: 'ASC' }, synchronize: true })
export class Font {
    @PrimaryGeneratedColumn({ comment: 'Font ID' })
    id: number;

    @Column({ type: 'varchar', length: 255, comment: 'Font name' })
    name: string;

    @Column({ type: 'varchar', length: 255, comment: 'path image font' })
    path_image: string;

    @Column({ type: 'varchar', length: 255, comment: 'link_download' })
    link_download: string;

    @ManyToOne(() => User, (user) => user.fonts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at', comment: 'Created at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: 'Updated at' })
    updatedAt: Date;

}
