import {
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
    Matches,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockDto {
    @ApiProperty({ example: 1, description: 'Id user' })
    @IsNumber({}, { message: 'Form must be a number' })
    from: number;

    @IsNumber({}, { message: 'To must be a number' })
    to: number;

    value: number;

    hashcode: string;
}
