import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import {Block} from "../../block/entities/block.entity";
import {TransactionsWaiting} from "../../transactions_waiting/entities/transactions_waiting.entity";
import {ComfirmTransaction} from "../../comfirm_transactions/entities/comfirm_transaction.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hainamcoin',
      models: [User, Block, TransactionsWaiting, ComfirmTransaction],
      autoLoadModels: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
