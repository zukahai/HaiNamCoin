import { IsString, MaxLength, IsNotEmpty, MinLength, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'User name' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(4, { message: 'Name is too short' })
    @MaxLength(20, { message: 'Name is too long' })
    name: string;

    @ApiProperty({ example: 'test@test.com', description: 'User email' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Incorrect email' })
    email: string;

    @ApiProperty({ example: '123456', description: 'User password' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password is too weak',
    })
    password: string;

    @ApiProperty({ example: 'admin', description: 'User role' })
    @IsNotEmpty({ message: 'Role must not be empty' })
    @IsString({ message: 'Role must be a string' })
    @Matches(/^(admin|user)$/, { message: 'Role is incorrect' })
    role: string;

    @ApiProperty({ example: 'isActivated', description: 'User isActivated' })
    @IsNotEmpty({ message: 'isActivated must not be empty' })
    @IsString({ message: 'isActivated must be a string' })
    @Matches(/^(true|false)$/, { message: 'isActivated is incorrect' })
    isActivated: boolean;
}
