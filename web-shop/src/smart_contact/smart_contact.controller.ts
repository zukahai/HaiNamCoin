import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmartContactService } from './smart_contact.service';
import { CreateSmartContactDto } from './dto/create-smart_contact.dto';
import { UpdateSmartContactDto } from './dto/update-smart_contact.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Smart Contact')
@Controller('smart-contact')
export class SmartContactController {
  constructor(private readonly smartContactService: SmartContactService) {}

  @Post()
  create(@Body() createSmartContactDto: CreateSmartContactDto) {
    return this.smartContactService.create(createSmartContactDto);
  }

  @Get()
  findAll() {
    return this.smartContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smartContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmartContactDto: UpdateSmartContactDto) {
    return this.smartContactService.update(+id, updateSmartContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smartContactService.remove(+id);
  }
}
