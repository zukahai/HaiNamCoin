import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class CreateTransactionsWaitingDto {
    @ApiProperty({ example: 2, description: 'Id user' })
    @IsNumber({}, { message: 'To must be a number' })
    to: number;

    @ApiProperty({ example: 100, description: 'Value' })
    value: number;

    @ApiProperty({ example: 'privateKey', description: 'Private key' })
    private_key: string;

    @ApiProperty({ example: 'public_key', description: 'Public Key' })
    public_key: string;
}
