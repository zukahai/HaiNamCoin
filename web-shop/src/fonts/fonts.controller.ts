import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { FontsService } from './fonts.service';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiImplicitFile} from "@nestjs/swagger/dist/decorators/api-implicit-file.decorator";
import {Express} from "express";
import {FilesInterceptor} from "@nestjs/platform-express";
import {GetCurrentUserId, Public} from "../decorators/auth/auth.decorator";

@ApiTags('Fonts')
@Controller('fonts')
@ApiBearerAuth()
@ApiTags('Fonts')
export class FontsController {
  constructor(private readonly fontsService: FontsService) {}

  @Post()
  create(@Body() createFontDto: CreateFontDto) {
    return this.fontsService.create(createFontDto);
  }

  @Public()
  @Get()
  findAll(@GetCurrentUserId() userId: number) {
    console.log(userId);
    return this.fontsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fontsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFontDto: UpdateFontDto) {
    return this.fontsService.update(+id, updateFontDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fontsService.remove(+id);
  }
}
