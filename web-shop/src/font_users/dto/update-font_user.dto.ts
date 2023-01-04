import { PartialType } from '@nestjs/swagger';
import { CreateFontUserDto } from './create-font_user.dto';

export class UpdateFontUserDto extends PartialType(CreateFontUserDto) {}
