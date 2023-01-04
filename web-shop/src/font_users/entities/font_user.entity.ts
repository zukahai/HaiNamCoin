import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Font} from "../../fonts/entities/font.entity";

@Entity({ name: 'font_users', orderBy: { id: 'ASC' }, synchronize: true })
export class FontUser {
    @PrimaryGeneratedColumn({ comment: 'Font user ID' })
    id: number;

    @ManyToOne(() => User, (user) => user.font_users)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Font, (font) => font.font_users)
    @JoinColumn({ name: 'font_id' })
    font: Font;
}
