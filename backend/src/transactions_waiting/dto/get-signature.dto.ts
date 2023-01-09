import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class GetSignatureDto {
    @ApiProperty({ example: "1234-2324-234", description: 'signature' })
    signature: string;

    @ApiProperty({ example: 'public_key', description: 'public key' })
    public_key: string;
}
