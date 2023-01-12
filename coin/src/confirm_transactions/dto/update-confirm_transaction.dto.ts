import { PartialType } from '@nestjs/swagger';
import { CreateConfirmTransactionDto } from './create-confirm_transaction.dto';

export class UpdateConfirmTransactionDto extends PartialType(CreateConfirmTransactionDto) {}
