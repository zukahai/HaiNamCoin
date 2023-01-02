import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsWaitingService } from './transactions_waiting.service';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HashProvider } from '../providers/hash.provider';
import {GetCurrentUserId, Public} from '../auth/decorators/custom.decarator';
import {StatusTransactionsWaitingDto} from "./dto/status_transactions_waiting.dto";
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

    @Public()
    @Post('status')
    @ApiOperation({ summary: 'Get all transactions waiting by status' })
    findAllStatus(@Body() statusTransactionsWaitingDto: StatusTransactionsWaitingDto) {
        return this.transactionsWaitingService.getTransactionsWaiting(statusTransactionsWaitingDto.status);
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
