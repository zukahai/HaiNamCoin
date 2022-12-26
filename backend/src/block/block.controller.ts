import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Public} from "../auth/decorators/custom.decarator";
@ApiTags('Block')
@ApiBearerAuth()
@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}

    @Post()
    @ApiOperation({summary: 'Create block'})
    create(@Body() createBlockDto: CreateBlockDto) {
        return this.blockService.create(createBlockDto);
    }
    @Public()
    @Get()
    @ApiOperation({summary: 'Get all block'})
    findAll() {
        return this.blockService.findAll();
    }

    @Get('/hashcode')
    @ApiOperation({summary: 'Get hash code'})
    findHashCode() {
        return this.blockService.findHashCode();
    }

    @Get('/check-cheat')
    @ApiOperation({summary: 'Check Cheat'})
    checkCheat() {
        return this.blockService.checkCheat();
    }

    @Get('/check-cheat-by-hash')
    @ApiOperation({summary: 'Check Cheat By Hash'})
    checkCheatByHash() {
        return this.blockService.checkCheatByHash();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get block by id'})
    findOne(@Param('id') id: string) {
        return this.blockService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update block by id'})
    update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
        return this.blockService.update(+id, updateBlockDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete block by id'})
    remove(@Param('id') id: string) {
        return this.blockService.remove(+id);
    }
}
