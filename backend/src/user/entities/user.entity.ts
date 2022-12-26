import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Block} from "../../block/entities/block.entity";



@Entity({name: "users", orderBy: {id: "ASC"}, synchronize: true})
export class User {
    @PrimaryGeneratedColumn({name: "id", comment: "User ID"})
    id: number;

    @Column({type: "varchar", length: 255, comment: "Name of user"})
    name: string;

    @Column({type: "varchar", length: 255, comment: "Email of user", unique: true,})
    email: string;

    @Column({type: "text", comment: "Password of user"})
    password: string;

    @Column({type: "varchar", length: 255, comment: "Role of user", default: "user"})
    role: string;

    @Column({type: "boolean", default: true, comment: "Is activated"})
    isActivated: boolean;

    @Column({type: "text", nullable: true, comment: "Refresh token"})
    refreshToken: string;

    @CreateDateColumn({name: "created_at", comment: "Created at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", comment: "Updated at"})
    updatedAt: Date;

    @OneToMany(() => Block, block => block.from)
    block_from: Block[];

    @OneToMany(() => Block, block => block.to)
    block_to: Block[];
}
