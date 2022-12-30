import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsWaitingService } from './transactions_waiting.service';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HashProvider } from '../providers/hash.provider';
import { GetCurrentUserId } from '../auth/decorators/custom.decarator';
@ApiBearerAuth()
@ApiTags('Transactions Waiting')
@Controller('transactions-waiting')
export class TransactionsWaitingController {
    constructor(private readonly transactionsWaitingService: TransactionsWaitingService) {}

    @Post()
    create(@Body() createTransactionsWaitingDto: CreateTransactionsWaitingDto, @GetCurrentUserId() userId: number) {
        return this.transactionsWaitingService.create(createTransactionsWaitingDto, userId);
    }

    @Get()
    findAll() {
        return this.transactionsWaitingService.findAll();
    }

    @Get('status0')
    @ApiOperation({ summary: 'Get all transactions waiting have status equal 0' })
    findAllStatus() {
        return this.transactionsWaitingService.getTransactionsWaiting();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsWaitingService.findOne(+id);
    }

    @Get('/pre-text/:id')
    @ApiOperation({ summary: 'Get getPreTextHash' })
    preText(@Param('id') id: string) {
        return this.transactionsWaitingService.getPreTextHash(+id);
    }

    @ApiOperation({ summary: 'Check nonce' })
    @Get('checkNonce/:id/:nonce')
    test(@Param('id') nonce: number, @Param('nonce') id: number) {
        return this.transactionsWaitingService.checkNonce(nonce, id);
    }
}
