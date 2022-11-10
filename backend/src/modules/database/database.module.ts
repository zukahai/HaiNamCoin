import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import {Block} from "../../block/entities/block.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hainamcoin',
      models: [User, Block],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
