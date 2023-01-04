import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateSmartContractDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'private_key_hainamcoin', description: 'private key' })
    private_key: string;

    @IsNotEmpty()
    @ApiProperty({ example: '123', description: 'value' })
    value: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '1', description: 'to' })
    to: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '1', description: 'font_id' })
    font_id: number;

}
