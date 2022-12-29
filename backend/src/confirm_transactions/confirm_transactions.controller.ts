import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmTransactionsService } from './confirm_transactions.service';
import { CreateConfirmTransactionDto } from './dto/create-confirm_transaction.dto';
import { UpdateConfirmTransactionDto } from './dto/update-confirm_transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/decorators/custom.decarator';

@Controller('confirm-transactions')
@ApiTags('Confirm Transactions')
@ApiBearerAuth()
export class ConfirmTransactionsController {
    constructor(private readonly confirmTransactionsService: ConfirmTransactionsService) {}

    @Post()
    @ApiOperation({ summary: 'Create confirm transaction' })
    create(@Body() createConfirmTransactionDto: CreateConfirmTransactionDto, @GetCurrentUserId() userId: number) {
        return this.confirmTransactionsService.create(createConfirmTransactionDto, userId);
    }

    @Get()
    findAll() {
        return this.confirmTransactionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.confirmTransactionsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateConfirmTransactionDto: UpdateConfirmTransactionDto) {
        return this.confirmTransactionsService.update(+id, updateConfirmTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.confirmTransactionsService.remove(+id);
    }
}
