import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConfirmTransactionUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: true, description: 'Status of confirm transaction' })
    status: boolean;

    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'Id of confirm transaction' })
    confirm_transaction_id: number;
}
