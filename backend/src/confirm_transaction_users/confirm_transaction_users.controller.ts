import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmTransactionUsersService } from './confirm_transaction_users.service';
import { CreateConfirmTransactionUserDto } from './dto/create-confirm_transaction_user.dto';
import { UpdateConfirmTransactionUserDto } from './dto/update-confirm_transaction_user.dto';

@Controller('confirm-transaction-users')
export class ConfirmTransactionUsersController {
  constructor(private readonly confirmTransactionUsersService: ConfirmTransactionUsersService) {}

  @Post()
  create(@Body() createConfirmTransactionUserDto: CreateConfirmTransactionUserDto) {
    return this.confirmTransactionUsersService.create(createConfirmTransactionUserDto);
  }

  @Get()
  findAll() {
    return this.confirmTransactionUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confirmTransactionUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfirmTransactionUserDto: UpdateConfirmTransactionUserDto) {
    return this.confirmTransactionUsersService.update(+id, updateConfirmTransactionUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confirmTransactionUsersService.remove(+id);
  }
}
