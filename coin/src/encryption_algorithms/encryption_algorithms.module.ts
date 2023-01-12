import { Module } from '@nestjs/common';
import { EncryptionAlgorithmsService } from './encryption_algorithms.service';
import { EncryptionAlgorithmsController } from './encryption_algorithms.controller';

@Module({
  controllers: [EncryptionAlgorithmsController],
  providers: [EncryptionAlgorithmsService]
})
export class EncryptionAlgorithmsModule {}
