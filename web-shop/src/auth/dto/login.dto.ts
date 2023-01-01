import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
    @ApiProperty({ example: 'hainam', description: 'User username' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @ApiProperty({ example: '123456', description: 'User password' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
