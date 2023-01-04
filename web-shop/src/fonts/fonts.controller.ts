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
  @ApiOperation({ summary: 'Get All font' })
  findAll() {
    return this.fontsService.findAll();
  }

  @Get('user')
  @ApiOperation({ summary: 'Get All font by user' })
  findAllByUser(@GetCurrentUserId() userId: number) {
    return this.fontsService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fontsService.findOne(+id);
  }
}
