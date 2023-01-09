import {IsEmpty, IsNotEmpty, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class GenerateSignatureDto {
    @ApiProperty({ example: 2, description: 'Id user' })
    @IsNotEmpty({ message: 'To must be not empty' })
    @IsNumber({}, { message: 'To must be a number' })
    to: number;

    @IsNotEmpty({ message: 'Value must be not empty' })
    @ApiProperty({ example: 100, description: 'Value' })
    value: number;
}
