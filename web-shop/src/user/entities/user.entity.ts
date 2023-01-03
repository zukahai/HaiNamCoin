import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Font} from "../../fonts/entities/font.entity";

@Entity({ name: 'users', orderBy: { id: 'ASC' }, synchronize: true })
export class User {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: 'Id of the user' })
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255, comment: 'Name of the user' })
    name: string;

    @Column({ name: 'email', unique: true, type: 'varchar', length: 255, comment: 'Email of the user' })
    email: string;

    @Column({ name: 'username', type: 'varchar', unique: true, length: 255, comment: 'Username of the user' })
    username: string;

    @Column({ name: 'password', type: 'text', comment: 'Password of the user' })
    password: string;

    @Column({ name: 'hainamcoin_id', type: 'int', comment: 'Hainamcoin id of the user' })
    hainamcoin_id: number;

    @Column({ name: 'access_token', type: 'text', comment: 'Access token of the user', nullable: true })
    access_token: string;

    @OneToMany(() => Font, (font) => font.user)
    fonts: Font[];

}
