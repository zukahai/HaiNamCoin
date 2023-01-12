import { PartialType } from '@nestjs/swagger';
import { CreateJoinConfirmTransactionDto } from './create-join_confirm_transaction.dto';

export class UpdateJoinConfirmTransactionDto extends PartialType(CreateJoinConfirmTransactionDto) {}
