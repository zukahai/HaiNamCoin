import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfirmTransactionsService } from './comfirm_transactions.service';
import { CreateComfirmTransactionDto } from './dto/create-comfirm_transaction.dto';
import { UpdateComfirmTransactionDto } from './dto/update-comfirm_transaction.dto';

@Controller('comfirm-transactions')
export class ComfirmTransactionsController {
  constructor(private readonly comfirmTransactionsService: ComfirmTransactionsService) {}

  @Post()
  create(@Body() createComfirmTransactionDto: CreateComfirmTransactionDto) {
    return this.comfirmTransactionsService.create(createComfirmTransactionDto);
  }

  @Get()
  findAll() {
    return this.comfirmTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfirmTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfirmTransactionDto: UpdateComfirmTransactionDto) {
    return this.comfirmTransactionsService.update(+id, updateComfirmTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfirmTransactionsService.remove(+id);
  }
}
