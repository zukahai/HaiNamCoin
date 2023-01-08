import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class GetSignatureDto {
    @ApiProperty({ example: 2, description: 'Id user' })
    @IsNumber({}, { message: 'To must be a number' })
    to: number;

    @ApiProperty({ example: 100, description: 'Value' })
    value: number;
}
