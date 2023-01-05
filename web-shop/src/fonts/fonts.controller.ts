import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException, HttpStatus, UploadedFile
} from '@nestjs/common';
import { FontsService } from './fonts.service';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {ApiImplicitFile} from "@nestjs/swagger/dist/decorators/api-implicit-file.decorator";
import {Express} from "express";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {GetCurrentUserId, Public} from "../decorators/auth/auth.decorator";
import {diskStorage} from "multer";
import {FileUploadDto} from "./dto/FileUploadDto";

@ApiTags('Fonts')
@Controller('fonts')
@ApiBearerAuth()
@ApiTags('Fonts')
export class FontsController {
    constructor(private readonly fontsService: FontsService) {
    }

    @Post()
    create(@Body() createFontDto: CreateFontDto) {
        return this.fontsService.create(createFontDto);
    }

    @Public()
    @Get()
    @ApiOperation({summary: 'Get All font'})
    findAll() {
        return this.fontsService.findAll();
    }

    @Get('user')
    @ApiOperation({summary: 'Get All font by user'})
    findAllByUser(@GetCurrentUserId() userId: number) {
        return this.fontsService.findAllByUser(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.fontsService.findOne(+id);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload font',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',

                }
            }
        }
    })
    @UseInterceptors(
        FileInterceptor('file', {

            storage: diskStorage({
                destination: './uploads/fonts',
                filename: (req, file, cb) => {
                    return cb(null, `${Date.now().toString()}-${file.originalname}`);
                }
            }),
            fileFilter(
                req: any,
                file: {
                    fieldname: string;
                    originalname: string;
                    encoding: string;
                    mimetype: string;
                    size: number;
                    destination: string;
                    filename: string;
                    path: string;
                    buffer: Buffer;
                },
                callback: (error: Error | null, acceptFile: boolean) => void,
            ) {
                if (!file.originalname.toLowerCase().match(/\.(ttf|otf|woff|woff2)$/)) {
                    return callback(new HttpException('Only font files are allowed!', HttpStatus.BAD_REQUEST), false);
                }
                callback(null, true);
            },
        }),
    )
    @Post('upload-font/:id')
    @ApiOperation({ summary: 'Upload font' })
    uploadFileFont(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        console.log(file);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload image',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',

                }
            }
        }
    })
    @UseInterceptors(
        FileInterceptor('file', {

            storage: diskStorage({
                destination: './uploads/images',
                filename: (req, file, cb) => {
                    return cb(null, `${Date.now().toString()}-${file.originalname}`);
                }
            }),
            fileFilter(
                req: any,
                file: {
                    fieldname: string;
                    originalname: string;
                    encoding: string;
                    mimetype: string;
                    size: number;
                    destination: string;
                    filename: string;
                    path: string;
                    buffer: Buffer;
                },
                callback: (error: Error | null, acceptFile: boolean) => void,
            ) {
                if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
                }
                callback(null, true);
            },
        }),
    )
    @Post('upload-image/:id')
    @ApiOperation({ summary: 'Upload image' })
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @GetCurrentUserId() idUser: number,
        @Param('id') id: string,
    ) {
        console.log(file);
    }




}
