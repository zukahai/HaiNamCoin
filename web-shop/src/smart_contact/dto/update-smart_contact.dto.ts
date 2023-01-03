import { PartialType } from '@nestjs/swagger';
import { CreateSmartContactDto } from './create-smart_contact.dto';

export class UpdateSmartContactDto extends PartialType(CreateSmartContactDto) {}
