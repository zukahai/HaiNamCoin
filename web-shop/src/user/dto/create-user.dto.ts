import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'hnc@gmail.com', description: 'User email' })
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: '123456', description: 'User password' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty({ example: 'HNC', description: 'User name' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: 'hnc', description: 'User username' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @ApiProperty({ example: '123456', description: 'User password confirmation' })
    @IsNotEmpty({ message: 'Password confirmation is required' })
    passwordConfirmation: string;
}
