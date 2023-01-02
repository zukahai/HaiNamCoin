import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class StatusTransactionsWaitingDto {

    @ApiProperty({ example: 0, description: 'status' })
    @IsNumber()
    status: number;
}
