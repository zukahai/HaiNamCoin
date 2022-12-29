import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateConfirmTransactionDto {
    @IsNotEmpty()
    @ApiProperty({ example: 1234, description: 'Nonce TransactionsWaiting' })
    nonce: number;

    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'Id TransactionsWaiting' })
    transaction_waiting_id: number;
}
