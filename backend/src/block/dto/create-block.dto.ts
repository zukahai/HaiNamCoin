import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockDto {
    @ApiProperty({ example: 1, description: 'Id user' })
    @IsNumber({}, { message: 'Form must be a number' })
    from: number;

    @ApiProperty({ example: 2, description: 'Id user' })
    @IsNumber({}, { message: 'To must be a number' })
    to: number;

    @ApiProperty({ example: 100, description: 'Value' })
    value: number;
}
