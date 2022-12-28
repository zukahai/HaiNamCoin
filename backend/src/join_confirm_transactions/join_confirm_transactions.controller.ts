import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoinConfirmTransactionsService } from './join_confirm_transactions.service';
import { CreateJoinConfirmTransactionDto } from './dto/create-join_confirm_transaction.dto';
import { UpdateJoinConfirmTransactionDto } from './dto/update-join_confirm_transaction.dto';
import {GetCurrentUser, GetCurrentUserId, Public} from "../auth/decorators/custom.decarator";
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('join-confirm-transactions')
export class JoinConfirmTransactionsController {
  constructor(private readonly joinConfirmTransactionsService: JoinConfirmTransactionsService) {}

  @Post()
  create(@Body() createJoinConfirmTransactionDto: CreateJoinConfirmTransactionDto, @GetCurrentUserId() userId: number) {
    return this.joinConfirmTransactionsService.create(createJoinConfirmTransactionDto, userId);
  }

  @Get()
  @Public()
  findAll() {
    return this.joinConfirmTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joinConfirmTransactionsService.findOne(+id);
  }

  @Get('transaction_wating/:id')
  getNumberConfirmTransactionWaiting(@Param('id') id: string) {
    return this.joinConfirmTransactionsService.getNumberJoinConfirmTransaction(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joinConfirmTransactionsService.remove(+id);
  }
}
