import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TransactionsWaitingService } from './transactions_waiting.service';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {GetCurrentUserId, Public} from '../auth/decorators/custom.decarator';
import {GenerateSignatureDto} from "./dto/generate-signature.dto";
import {GetSignatureDto} from "./dto/get-signature.dto";
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
    @Get('by')
    @ApiOperation({ summary: 'Get all transactions waiting by status' })
    findAllStatus(@Query('status') status: number) {
        return this.transactionsWaitingService.getTransactionsWaiting(status);
    }

    @Public()
    @Get('time')
    @ApiOperation({ summary: 'Get second time start transaction' })
    getTime(@Query('id') id: number) {
        return this.transactionsWaitingService.getTime(id);
    }

    @Public()
    @Get('percentage-fee')
    @ApiOperation({ summary: 'Get percentage fee' })
    getPercentageFee(){
        return this.transactionsWaitingService.getPercentageFee();
    }

    @Post('generate-signature')
    @ApiOperation({ summary: 'Generate signature transaction waiting' })
    generateSignature(@Body() generateSignatureDto: GenerateSignatureDto, @GetCurrentUserId() userId: number) {
        return this.transactionsWaitingService.generateSignature(generateSignatureDto, userId);
    }

    @Post('get-signature')
    @ApiOperation({ summary: 'Get signature transaction waiting' })
    getSignature(@Body() getSignatureDto: GetSignatureDto) {
        return this.transactionsWaitingService.getSignature(getSignatureDto);
    }

    @Public()
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
