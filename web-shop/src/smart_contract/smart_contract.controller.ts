import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {SmartContractService} from "./smart_contract.service";
import {CreateSmartContractDto} from "./dto/create-smart_contract.dto";
import {GetCurrentUserId, Public} from "../decorators/auth/auth.decorator";

@ApiBearerAuth()
@ApiTags('Smart Contract')
@Controller('smart-contract')
export class SmartContractController {
  constructor(private readonly smartContactService: SmartContractService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  create(@Body() createSmartContactDto: CreateSmartContractDto, @GetCurrentUserId() id: number) {
    return this.smartContactService.create(createSmartContactDto, id);
  }

  @Public()
  @ApiOperation({ summary: 'Check transaction by id' })
  @Get('check/:id')
  check(@Param('id') id: string) {
    return this.smartContactService.checkTransaction(+id);
  }

}
