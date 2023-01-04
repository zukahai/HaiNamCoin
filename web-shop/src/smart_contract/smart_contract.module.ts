import { Module } from '@nestjs/common';
import { SmartContractService } from './smart_contract.service';
import { SmartContractController } from './smart_contract.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "../transactions/entities/transaction.entity";
import {UserModule} from "../user/user.module";
import {TransactionsModule} from "../transactions/transactions.module";
import {FontsModule} from "../fonts/fonts.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UserModule, TransactionsModule, FontsModule, HttpModule],
  controllers: [SmartContractController],
  providers: [SmartContractService],
  exports: [SmartContractService]
})
export class SmartContractModule {}
