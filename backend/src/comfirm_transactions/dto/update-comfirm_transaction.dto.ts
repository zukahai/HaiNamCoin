import { PartialType } from '@nestjs/swagger';
import { CreateComfirmTransactionDto } from './create-comfirm_transaction.dto';

export class UpdateComfirmTransactionDto extends PartialType(CreateComfirmTransactionDto) {}
