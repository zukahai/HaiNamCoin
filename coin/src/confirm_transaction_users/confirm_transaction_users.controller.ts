import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmTransactionUsersService } from './confirm_transaction_users.service';
import { CreateConfirmTransactionUserDto } from './dto/create-confirm_transaction_user.dto';
import { UpdateConfirmTransactionUserDto } from './dto/update-confirm_transaction_user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/decorators/custom.decarator';

@ApiBearerAuth()
@Controller('confirm-transaction-users')
@ApiTags('Confirm Transaction Users')
export class ConfirmTransactionUsersController {
    constructor(private readonly confirmTransactionUsersService: ConfirmTransactionUsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create and check generate block' })
    create(
        @Body() createConfirmTransactionUserDto: CreateConfirmTransactionUserDto,
        @GetCurrentUserId() userId: number,
    ) {
        return this.confirmTransactionUsersService.create(createConfirmTransactionUserDto, userId);
    }

    @ApiOperation({ summary: 'Get all confirm transacton' })
    @Get()
    findAll() {
        return this.confirmTransactionUsersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.confirmTransactionUsersService.findOne(+id);
    }
}
