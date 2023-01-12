import { Injectable } from '@nestjs/common';
import { CreateConfirmTransactionDto } from './dto/create-confirm_transaction.dto';
import { UpdateConfirmTransactionDto } from './dto/update-confirm_transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmTransaction } from './entities/confirm_transaction.entity';
import { JoinConfirmTransaction } from '../join_confirm_transactions/entities/join_confirm_transaction.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { TransactionsWaitingService } from '../transactions_waiting/transactions_waiting.service';

@Injectable()
export class ConfirmTransactionsService {
    constructor(
        @InjectRepository(ConfirmTransaction) private confirmTransactionRepository: Repository<ConfirmTransaction>,
        private readonly userService: UserService,
        private readonly transactionsWaitingService: TransactionsWaitingService,
    ) {}

    async create(createConfirmTransactionDto: CreateConfirmTransactionDto, userId: number) {
        const user = await this.userService.findOne(userId);
        const transactionWaiting = await this.transactionsWaitingService.findOne(
            createConfirmTransactionDto.transaction_waiting_id,
        );
        if (transactionWaiting.status !== 0) {
            return {
                message: 'error',
                error: 'The transaction has been processed',
            };
        }
        return this.confirmTransactionRepository.save({
            nonce: createConfirmTransactionDto.nonce.toString(),
            transaction_waiting: transactionWaiting,
            user: user,
        });
    }

    findAll() {
        return this.confirmTransactionRepository.find();
    }

    async findOne(id: number) {
        return await this.confirmTransactionRepository.findOne({
            where: {
                id: id,
            },
            relations: ['user', 'transaction_waiting', 'confirm_transaction_user'],
        });
    }

    async getNumberAcceptTransaction(confirmTransactionId: number) {
        const confirmTransaction = await this.findOne(confirmTransactionId);
        const confirmTransactionUser = confirmTransaction.confirm_transaction_user;
        let numberAcceptTransaction = 0;
        confirmTransactionUser.forEach((confirmTransactionUser) => {
            if (confirmTransactionUser.status === true) numberAcceptTransaction++;
        });
        return numberAcceptTransaction;
    }

    update(id: number, updateConfirmTransactionDto: UpdateConfirmTransactionDto) {
        return `This action updates a #${id} confirmTransaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} confirmTransaction`;
    }
}
