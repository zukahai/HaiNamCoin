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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsWaitingService.findOne(+id);
    }

    @ApiOperation({ summary: 'Check nonce' })
    @Get('checkNonce/:id/:nonce')
    test(@Param('id') nonce: number, @Param('nonce') id: number) {
        return this.transactionsWaitingService.checkNonce(nonce, id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
        return this.transactionsWaitingService.update(+id, updateTransactionsWaitingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionsWaitingService.remove(+id);
    }
}
