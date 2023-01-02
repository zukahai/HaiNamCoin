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
        if (userId == createTransactionsWaitingDto.to) {
            return {
                message: 'error',
                error: 'Unable to transfer money to yourself',
            };
        }
        if (user_from.private_key != createTransactionsWaitingDto.private_key) {
            console.log(user_from.private_key);
            return {
                message: 'error',
                error: 'Private key is not correct',
                private_key: createTransactionsWaitingDto.private_key,
                user_private_key: user_from.private_key,
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
            const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + ' ' + new Date(tw.createdAt).getTime() + ' ';
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

    async getPreTextHash(tw_id: number) {
        const tw = await this.findOne(tw_id);
        const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + ' ' + new Date(tw.createdAt).getTime() + ' ';
        return {
            message: 'ok',
            text: text,
        };
    }

    async findAll() {
        return await this.transactionsWaitingRepository.find({
            relations: { from: true, to: true },
            select: {nonce: false, permutation_nonce: false},
            order: {
                id: 'DESC',
            }
        });
    }

    //get all transactionWaiting have status = 0 order by id desc
    async getTransactionsWaiting(status: number) {
        return await this.transactionsWaitingRepository.find({
            where: {
                status: status,
            },
            order: {
                id: 'DESC',
            },
            relations: { from: true, to: true },
        });
    }

    async checkNonce(id: number, nonce: number) {
        const tw = await this.findOne(id);
        console.log(tw.from);
        const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + ' ' + new Date(tw.createdAt).getTime() + ' ' + nonce;
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

        let tw = await this.transactionsWaitingRepository.findOne({
            where: {
                id: id,
            },
            relations: { from: true, to: true, join_confirm_transaction: true, confirm_transactions: true },
        });
        const getTime = await this.getTime(id);
        tw.nonce = (getTime.option == '3') ? tw.nonce : null;
        tw.permutation_nonce = (getTime.option == '3' || getTime.option == '2') ? tw.permutation_nonce : null;
        //copy to new object
        let tw2 = {
            ...tw,
            text_question: tw.from.id + ' ' + tw.to.id + ' ' + tw.value + ' ' + new Date(tw.createdAt).getTime() + ' ',
        };
        return tw2;
    }

    async findOneFull(id: number) {
        return await this.transactionsWaitingRepository.findOne({
            where: {
                id: id,
            },
            relations: { from: true, to: true, join_confirm_transaction: true, confirm_transactions: true },
        });
    }

    async getTime(id: number) {
        const tw = await this.findOneFull(id);
        const sub = new Date().getTime() - tw.createdAt.getTime();
        const time_second = Math.floor(sub / 1000);
        const option = (tw.status == 0) ? ((time_second < 120) ? '1' : '2') : '3';
        return {
            message: 'ok',
            time_second: time_second,
            option: option,
        }
    }

    save(transactionWaiting: TransactionsWaiting) {
        return this.transactionsWaitingRepository.save(transactionWaiting);
    }

    update(id: number, updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
        return `This action updates a #${id} transactionsWaiting`;
    }

    remove(id: number) {
        return `This action removes a #${id} transactionsWaiting`;
    }
}
