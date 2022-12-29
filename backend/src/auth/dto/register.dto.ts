import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../validators/custom.validator';

export class RegisterDto {
    @ApiProperty({ example: 'admin', description: 'Username' })
    @IsNotEmpty({ message: 'Username must not be empty' })
    @IsString({ message: 'Must be a string' })
    name: string;

    @ApiProperty({ example: 'admin', description: 'Username' })
    @IsNotEmpty({ message: 'Username must not be empty' })
    @IsString({ message: 'Must be a string' })
    username: string;
    @ApiProperty({ example: 'hnc00001@gmail.com', description: 'Email' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, { message: 'Email is incorrect' })
    email: string;

    @ApiProperty({ example: 'hnc00001', description: 'Password' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Must be a string' })
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    password: string;

    @ApiProperty({ example: 'hnc00001', description: 'Password' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Must be a string' })
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    @Match('password', { message: 'Password confirmation is incorrect' })
    passwordConfirm: string;
}

//chòi nhìn đã he, có chi sau em mượn coi tiếp hehe, em làm tiếp đã nhaok
