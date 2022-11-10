import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(20, { message: 'Name is too long' })
  name: string;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString({ message: 'Confirm password must be a string' })
  @MinLength(8, { message: 'Confirm password is too short' })
  @MaxLength(20, { message: 'Confirm password is too long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Confirm password is too weak',
  })
  confirmPassword: string;

  @ApiProperty({ example: 'admin', description: 'User role' })
  @IsString({ message: 'Role must be a string' })
  @Matches(/^(admin|user)$/, { message: 'Role is incorrect' })
  role: string;
}
