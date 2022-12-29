import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'hnc00001@gmail.com', description: 'Email' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsString({ message: 'Must be a string' })
    @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, { message: 'Email is incorrect' })
    email: string;

    @ApiProperty({ example: 'hnc00001', description: 'Password' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Must be a string' })
    password: string;
}
