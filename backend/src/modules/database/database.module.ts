import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../user/entities/user.entity";
import {Block} from "../../block/entities/block.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'hainamcoin',
            entities: [User, Block],
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})

export class DatabaseModule {

}
