import { PartialType } from '@nestjs/swagger';
import { CreateEncryptionAlgorithmDto } from './create-encryption_algorithm.dto';

export class UpdateEncryptionAlgorithmDto extends PartialType(CreateEncryptionAlgorithmDto) {}
