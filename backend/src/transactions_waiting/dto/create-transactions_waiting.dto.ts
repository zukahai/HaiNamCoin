import {IsNumber,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {User} from "../../user/entities/user.entity";

export class CreateTransactionsWaitingDto {
    @ApiProperty({example: 1, description: 'Id TransactionsWaiting'})
    @IsNumber({}, {message: 'Form must be a number'})
    from: number;

    @ApiProperty({example: 2, description: 'Id user'})
    @IsNumber({}, {message: 'To must be a number'})
    to: number;

    @ApiProperty({example: 100, description: 'Value'})
    value: number;

    @ApiProperty({example: 'true', description: 'Status'})
    status: boolean

    @ApiProperty({example: 'public_key', description: 'Public Kty'})
    public_key: string;
}
