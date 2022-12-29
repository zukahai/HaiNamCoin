import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateConfirmTransactionUserDto } from './dto/create-confirm_transaction_user.dto';
import { UpdateConfirmTransactionUserDto } from './dto/update-confirm_transaction_user.dto';
import { ConfirmTransactionUser } from './entities/confirm_transaction_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { ConfirmTransactionsService } from '../confirm_transactions/confirm_transactions.service';
import { BlockService } from '../block/block.service';
import { JoinConfirmTransactionsService } from '../join_confirm_transactions/join_confirm_transactions.service';
import { HashProvider } from '../providers/hash.provider';
import { CreateBlockDto } from '../block/dto/create-block.dto';
import { TransactionsWaitingService } from '../transactions_waiting/transactions_waiting.service';

@Injectable()
export class ConfirmTransactionUsersService {
    constructor(
        @InjectRepository(ConfirmTransactionUser)
        private confirmTransactionUserRepository: Repository<ConfirmTransactionUser>,
        private userService: UserService,
        private confirmTransactionService: ConfirmTransactionsService,
        private blockService: BlockService,
        private joinConfirmTransactionsService: JoinConfirmTransactionsService,
        private transactionsWaitingService: TransactionsWaitingService,
    ) {}

    async create(createConfirmTransactionUserDto: CreateConfirmTransactionUserDto, userId: number) {
        const user = await this.userService.findOne(userId);
        const confirmTransaction = await this.confirmTransactionService.findOne(
            createConfirmTransactionUserDto.confirm_transaction_id,
        );
        const transactionWaiting = confirmTransaction.transaction_waiting;
        if (transactionWaiting.status !== 0) {
            return {
                message: 'error',
                error: 'The transaction has been processed',
            };
        }
        const numberPeople = await this.joinConfirmTransactionsService.getNumberJoinConfirmTransaction(
            transactionWaiting.id,
        );
        const numberAcceptTransaction = await this.confirmTransactionService.getNumberAcceptTransaction(
            confirmTransaction.id,
        );
        console.log('numberPeople', numberPeople.number_join_confirm_transaction);
        console.log('numberAcceptTransaction', numberAcceptTransaction);
        let confirmTransactionUsers = confirmTransaction.confirm_transaction_user;
        let confirmTransactionUser = null;
        if (confirmTransactionUsers.length > 0) {
            confirmTransactionUsers[0].status = createConfirmTransactionUserDto.status;
            confirmTransactionUser = await this.confirmTransactionUserRepository.save(confirmTransactionUsers[0]);
        } else {
            confirmTransactionUser = await this.confirmTransactionUserRepository.save({
                status: createConfirmTransactionUserDto.status,
                user: user,
                confirmTransaction: confirmTransaction,
            });
        }
        if (confirmTransactionUser.status === true) {
            // if (numberPeople.number_join_confirm_transaction >= HashProvider.min_client) {
            let createBlockDto = new CreateBlockDto();
            let transactionwaiting = await this.transactionsWaitingService.findOne(transactionWaiting.id);
            const from_id = transactionwaiting.from.id;
            const to_id = transactionwaiting.to.id;
            const value = transactionwaiting.value;

            await this.blockService.createByProperties(from_id, to_id, value);
            transactionwaiting.status = 1;
            await this.transactionsWaitingService.save(transactionwaiting);

            // }
        }
        return confirmTransactionUser;
    }

    async findAll() {
        return await this.confirmTransactionUserRepository.find();
    }

    async findOne(id: number) {
        return await this.confirmTransactionUserRepository.findOne({
            where: {
                id: id,
            },
            relations: ['user', 'confirmTransaction'],
        });
    }

    update(id: number, updateConfirmTransactionUserDto: UpdateConfirmTransactionUserDto) {
        return `This action updates a #${id} confirmTransactionUser`;
    }

    remove(id: number) {
        return `This action removes a #${id} confirmTransactionUser`;
    }
}
