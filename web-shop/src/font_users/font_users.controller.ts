import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FontUsersService } from './font_users.service';
import { CreateFontUserDto } from './dto/create-font_user.dto';
import { UpdateFontUserDto } from './dto/update-font_user.dto';
import {ApiTags} from "@nestjs/swagger";

@Controller('font-users')
@ApiTags('Font Users')

export class FontUsersController {
  constructor(private readonly fontUsersService: FontUsersService) {}

  @Post()
  create(@Body() createFontUserDto: CreateFontUserDto) {
    return this.fontUsersService.create(createFontUserDto);
  }

  @Get()
  findAll() {
    return this.fontUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fontUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFontUserDto: UpdateFontUserDto) {
    return this.fontUsersService.update(+id, updateFontUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fontUsersService.remove(+id);
  }
}
