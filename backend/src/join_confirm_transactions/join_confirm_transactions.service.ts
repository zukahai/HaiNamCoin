import { Injectable } from '@nestjs/common';
import { CreateJoinConfirmTransactionDto } from './dto/create-join_confirm_transaction.dto';
import { UpdateJoinConfirmTransactionDto } from './dto/update-join_confirm_transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinConfirmTransaction } from './entities/join_confirm_transaction.entity';
import { Repository } from 'typeorm';
import { TransactionsWaitingService } from '../transactions_waiting/transactions_waiting.service';
import { UserService } from '../user/user.service';
import { TransactionsWaiting } from '../transactions_waiting/entities/transactions_waiting.entity';
import { forEachResolvedProjectReference } from 'ts-loader/dist/instances';

@Injectable()
export class JoinConfirmTransactionsService {
    constructor(
        @InjectRepository(JoinConfirmTransaction)
        private joinConfirmTransactionsRepository: Repository<JoinConfirmTransaction>,
        private readonly userService: UserService,
        private readonly transactionsWaitingService: TransactionsWaitingService,
    ) {}

    async create(createJoinConfirmTransactionDto: CreateJoinConfirmTransactionDto, user_id: any) {
        const user = await this.userService.findOne(user_id);
        const transaction_waiting = await this.transactionsWaitingService.findOne(
            createJoinConfirmTransactionDto.transaction_waiting_id,
        );
        const user_join_confirm_transaction = transaction_waiting.join_confirm_transaction;
        console.log(user_join_confirm_transaction);
        let joinConfirmTransaction = null;
        for (let i = 0; i < user_join_confirm_transaction.length; i++) {
            const user_join_confirm_transaction_element = await this.findOne(user_join_confirm_transaction[i].id);
            console.log(user_join_confirm_transaction_element);
            if (
                user_join_confirm_transaction_element.user.id == user.id &&
                user_join_confirm_transaction_element.transaction_waiting.id == transaction_waiting.id
            ) {
                joinConfirmTransaction = user_join_confirm_transaction_element;
                break;
            }
        }

        if (joinConfirmTransaction != null) {
            return this.update(joinConfirmTransaction.id);
        }

        return await this.joinConfirmTransactionsRepository.save({
            user: user,
            transaction_waiting: transaction_waiting,
        });
    }

    findAll() {
        return this.joinConfirmTransactionsRepository.find();
    }

    async getNumberJoinConfirmTransaction(transaction_waiting_id: number) {
        const transaction_waiting = await this.transactionsWaitingService.findOne(transaction_waiting_id);
        let number_join_confirm_transaction = 0;
        for (const joinConfirmTransaction of transaction_waiting.join_confirm_transaction) {
            const sub = new Date().getTime() - joinConfirmTransaction.time_join.getTime();
            if (sub < 1000 * 60 * 3) number_join_confirm_transaction++;
        }
        return {
            number_join_confirm_transaction: number_join_confirm_transaction,
        };
    }

    async findOne(id: number) {
        return await this.joinConfirmTransactionsRepository.findOne({
            where: {
                id: id,
            },
            relations: { user: true, transaction_waiting: true },
        });
    }

    async update(id: number) {
        const joinConfirmTransaction = await this.joinConfirmTransactionsRepository.findOneBy({ id: id });
        joinConfirmTransaction.time_join = new Date();
        await this.joinConfirmTransactionsRepository.save(joinConfirmTransaction);
        return joinConfirmTransaction;
    }

    remove(id: number) {
        return `This action removes a #${id} joinConfirmTransaction`;
    }
}
