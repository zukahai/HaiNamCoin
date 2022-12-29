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
            let tw = await this.transactionsWaitingRepository.save({
                from: user_from,
                to: user_to,
                value: createTransactionsWaitingDto.value,
            });
            const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + new Date(tw.createdAt).getTime() + ' ';
            const nonce = HashProvider.findNonce(text);
            tw.nonce = nonce.toString();
            tw.permutation_nonce = HashProvider.randomPermutationNoce(nonce).toString();
            await this.transactionsWaitingRepository.save(tw);
            return {
                message: 'ok',
                text: text,
                nonce: nonce.toString(),
                permutation_nonce: tw.permutation_nonce,
                data: tw,
            };
        }
        return {
            message: 'error',
            error: 'Public key not match',
        };
    }

    async findAll() {
        return await this.transactionsWaitingRepository.find();
    }

    async checkNonce(id: number, nonce: number) {
        const tw = await this.findOne(id);
        console.log(tw.from);
        const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + new Date(tw.createdAt).getTime() + ' ' + nonce;
        const hash = HashProvider.hash256(text);
        const message = hash.startsWith(HashProvider.hard) ? 'ok' : 'error';
        return {
            message: message,
            id: id,
            nonce: nonce,
            text: text,
            hash: hash,
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
