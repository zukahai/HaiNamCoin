import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutoBankService } from './auto-bank.service';
import { CreateAutoBankDto } from './dto/create-auto-bank.dto';
import { UpdateAutoBankDto } from './dto/update-auto-bank.dto';

@Controller('auto-bank')
export class AutoBankController {
    constructor(private readonly autoBankService: AutoBankService) {}

    @Post()
    create(@Body() createAutoBankDto: CreateAutoBankDto) {
        return this.autoBankService.create(createAutoBankDto);
    }

    @Get()
    findAll() {
        return this.autoBankService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.autoBankService.findOne(+id);
    }

    @Get(':bankName/:token')
    getHistory(@Param('bankName') bankName: string, @Param('token') token: string) {
        return this.autoBankService.getHistory(bankName, token);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAutoBankDto: UpdateAutoBankDto) {
        return this.autoBankService.update(+id, updateAutoBankDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.autoBankService.remove(+id);
    }
}
