import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../user/entities/user.entity";
import {Font} from "../fonts/entities/font.entity";
import {Transaction} from "../transactions/entities/transaction.entity";
import {FontUser} from "../font_users/entities/font_user.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'webshop',
            entities: [User, Font, Transaction, FontUser],
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
