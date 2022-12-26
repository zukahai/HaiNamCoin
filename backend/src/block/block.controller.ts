import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GetCurrentUser, GetCurrentUserId} from "../auth/decorators/custom.decarator";
@ApiTags('block')
@ApiBearerAuth()
@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}


    @Post()
    create(@Body() createBlockDto: CreateBlockDto) {
        return this.blockService.create(createBlockDto);
    }

    @Get()
    findAll(@GetCurrentUserId() userId: number) {
        return this.blockService.findAll();
    }

    @Get('/hashcode')
    findHashCode() {
        return this.blockService.findHashCode();
    }

    @Get('/checkcheate')
    checkCheate() {
        return this.blockService.checkCheat();
    }

    @Get('/checkCheatByHash')
    checkCheatByHash() {
        return this.blockService.checkCheatByHash();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blockService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
        return this.blockService.update(+id, updateBlockDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blockService.remove(+id);
    }
}
