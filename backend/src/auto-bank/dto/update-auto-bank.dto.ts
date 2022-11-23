import { PartialType } from '@nestjs/swagger';
import { CreateAutoBankDto } from './create-auto-bank.dto';

export class UpdateAutoBankDto extends PartialType(CreateAutoBankDto) {}
