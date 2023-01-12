import { Module } from '@nestjs/common';
import { AutoBankService } from './auto-bank.service';
import { AutoBankController } from './auto-bank.controller';

@Module({
  controllers: [AutoBankController],
  providers: [AutoBankService]
})
export class AutoBankModule {}
