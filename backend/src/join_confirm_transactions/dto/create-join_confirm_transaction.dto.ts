import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateJoinConfirmTransactionDto {
    @ApiProperty({example: 1, description: 'Id user'})
    @IsNumber({}, {message: 'Id user must be a number'})
    user_id: number;

    @ApiProperty({example: 2, description: 'Id TransactionsWaiting'})
    @IsNumber({}, {message: 'transaction_waiting_id must be a number'})
    transaction_waiting_id: number;
}
