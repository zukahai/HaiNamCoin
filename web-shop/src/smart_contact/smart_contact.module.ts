import { Module } from '@nestjs/common';
import { SmartContactService } from './smart_contact.service';
import { SmartContactController } from './smart_contact.controller';

@Module({
  controllers: [SmartContactController],
  providers: [SmartContactService]
})
export class SmartContactModule {}
