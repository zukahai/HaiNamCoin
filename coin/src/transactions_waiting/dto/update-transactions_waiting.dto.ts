import { PartialType } from '@nestjs/swagger';
import { CreateTransactionsWaitingDto } from './create-transactions_waiting.dto';

export class UpdateTransactionsWaitingDto extends PartialType(CreateTransactionsWaitingDto) {}
