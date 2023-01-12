import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFontDto {
    @ApiProperty({ example: 'Font name', description: 'Font name' })
    @IsNotEmpty({ message: 'Font name is required' })
    name: string;

    @ApiProperty({ example: 100, description: 'Font price' })
    @IsNotEmpty({ message: 'Font price is required' })
    price: number;

    @ApiProperty({ example: 100, description: 'Font price license' })
    @IsNotEmpty({ message: 'Font price license is required' })
    priceLicense: number;

    @ApiProperty({ example: 1, description: 'Font user id' })
    @IsNotEmpty({ message: 'Font user id is required' })
    userId: number;
}
