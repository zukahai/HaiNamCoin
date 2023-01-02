import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ConnectUserDto {
    @ApiProperty({ example: 'access token', description: 'access token' })
    @IsNotEmpty({ message: 'Access token is required' })
    access_token: string;
}
