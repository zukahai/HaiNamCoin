import { PartialType } from '@nestjs/swagger';
import { CreateConfirmTransactionUserDto } from './create-confirm_transaction_user.dto';

export class UpdateConfirmTransactionUserDto extends PartialType(CreateConfirmTransactionUserDto) {}
