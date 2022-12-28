import { Injectable } from '@nestjs/common';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsWaiting } from './entities/transactions_waiting.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { HashProvider } from '../providers/hash.provider';

@Injectable()
export class TransactionsWaitingService {
    constructor(
        @InjectRepository(TransactionsWaiting) private transactionsWaitingRepository: Repository<TransactionsWaiting>,
        private readonly userService: UserService,
    ) {}

    async create(createTransactionsWaitingDto: CreateTransactionsWaitingDto, userId: number) {
        const user_from = await this.userService.findOne(userId);
        if (user_from.private_key != createTransactionsWaitingDto.private_key) {
            return {
                message: 'error',
                error: 'Private key is not correct',
            };
        }
        const user_to = await this.userService.findOne(createTransactionsWaitingDto.to);
        let totalValue = await this.userService.getTotalMoney(user_from.id);

        if (totalValue < createTransactionsWaitingDto.value) {
            return {
                message: 'error',
                error: 'Money is not enough ' + totalValue + ' < ' + createTransactionsWaitingDto.value,
            };
        }

        const user_by_public_key = await this.userService.findByPublicKey(createTransactionsWaitingDto.public_key);

        if (user_by_public_key != null && user_to != null && user_by_public_key.id == user_to.id) {
            const user_to = await this.userService.findOne(createTransactionsWaitingDto.to);
            return {
                message: 'ok',
                data: await this.transactionsWaitingRepository.save({
                    from: user_from,
                    to: user_to,
                    value: createTransactionsWaitingDto.value,
                }),
            };
        }
        return {
            message: 'error',
            error: 'Public key not match',
        };
    }

    findAll() {
        return `This action returns all transactionsWaiting`;
    }

    async test(id: number, nonce: number) {
        const tw = await this.findOne(id);
        console.log(tw.from);
        const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + new Date(tw.createdAt).getTime() + ' ' + nonce;
        return {
            id: id,
            nonce: nonce,
            text: text,
            hash: HashProvider.hash256(text),
        };
    }

    async findOne(id: number) {
        return await this.transactionsWaitingRepository.findOne({
            where: {
                id: id,
            },
            relations: { join_confirm_transaction: true, from: true, to: true },
        });
    }

    update(id: number, updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
        return `This action updates a #${id} transactionsWaiting`;
    }

    remove(id: number) {
        return `This action removes a #${id} transactionsWaiting`;
    }
}
