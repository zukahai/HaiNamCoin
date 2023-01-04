import { PartialType } from '@nestjs/swagger';
import { CreateSmartContractDto } from './create-smart_contract.dto';

export class UpdateSmartContractDto extends PartialType(CreateSmartContractDto) {}
