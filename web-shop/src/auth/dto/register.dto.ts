import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../decorators/validator/custom.validator';
export class RegisterDto {
    @ApiProperty({ example: 'hncoin@gmail.com', description: 'Email' })
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @Length(6, 16, { message: 'Must be at least 6 and not longer than 16 characters' })
    readonly password: string;

    @ApiProperty({ example: '123456', description: 'Confirm password' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @Length(6, 16, { message: 'Must be at least 6 and not longer than 16 characters' })
    @Match('password', { message: 'Confirm password does not match' })
    readonly confirmPassword: string;

    @ApiProperty({ example: 'Hai Nam', description: 'Full name' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    readonly name: string;

    @ApiProperty({ example: 'hainam', description: 'Username' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    readonly username: string;
}
