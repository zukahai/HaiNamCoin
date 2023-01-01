import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/custom.decarator';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Block')
@ApiBearerAuth()
@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}

    @Post()
    @ApiOperation({ summary: 'Create block' })
    create(@Body() createBlockDto: CreateBlockDto) {
        return this.blockService.create(createBlockDto);
    }
    @Get('/dispersion-data')
    @ApiOperation({ summary: 'Dispersion Data' })
    dispersionData() {
        this.blockService.dispersionData();
        return {
            message: 'ok',
        };
    }
    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all block' })
    findAll() {
        return this.blockService.findAllDESC();
    }

    @Get('/hashcode')
    @ApiOperation({ summary: 'Get hash code' })
    findHashCode() {
        return this.blockService.findHashCode();
    }

    @Get('/check-cheat')
    @ApiOperation({ summary: 'Check Cheat' })
    checkCheat() {
        return this.blockService.checkCheat();
    }

    @Get('/check-cheat-by-hash')
    @ApiOperation({ summary: 'Check Cheat By Hash' })
    checkCheatByHash() {
        return this.blockService.checkCheatByHash();
    }

    @Get(':user_id')
    @ApiOperation({ summary: 'Get block by Form or To' })
    findOne(@Param('user_id') user_id: string) {
        return this.blockService.findByFormOrTo(+user_id);
    }
}
