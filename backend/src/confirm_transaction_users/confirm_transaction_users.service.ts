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

@Injectable()
export class ConfirmTransactionUsersService {
    constructor(
        @InjectRepository(ConfirmTransactionUser)
        private confirmTransactionUserRepository: Repository<ConfirmTransactionUser>,
        private userService: UserService,
        private confirmTransactionService: ConfirmTransactionsService,
        private blockService: BlockService,
        private joinConfirmTransactionsService: JoinConfirmTransactionsService,
    ) {}

    async create(createConfirmTransactionUserDto: CreateConfirmTransactionUserDto, userId: number) {
        const user = await this.userService.findOne(userId);
        const confirmTransaction = await this.confirmTransactionService.findOne(
            createConfirmTransactionUserDto.confirm_transaction_id,
        );
        const transactionWaiting = confirmTransactionUser.transaction_waiting;
        const numberPeople = await this.joinConfirmTransactionsService.getNumberJoinConfirmTransaction();

        const confirmTransactionUser = confirmTransaction.confirm_transaction_user;

        console.log(confirmTransactionUser);
        if (confirmTransactionUser.length > 0) {
            confirmTransactionUser[0].status = createConfirmTransactionUserDto.status;
            return await this.confirmTransactionUserRepository.save(confirmTransactionUser[0]);
        }

        return await this.confirmTransactionUserRepository.save({
            status: createConfirmTransactionUserDto.status,
            user: user,
            confirmTransaction: confirmTransaction,
        });
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
