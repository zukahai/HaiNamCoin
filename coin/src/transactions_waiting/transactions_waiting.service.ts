import { Injectable } from '@nestjs/common';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsWaiting } from './entities/transactions_waiting.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { HashProvider } from '../providers/hash.provider';
import {GenerateSignatureDto} from "./dto/generate-signature.dto";
import {RsaProvider} from "../providers/rsa.provider";
import {GetSignatureDto} from "./dto/get-signature.dto";

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
            return {
                message: 'error',
                error: 'Private key is not correct'
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
                signature: createTransactionsWaitingDto.signature,
                status: 0,
            });
            const text = tw.from.id + ' ' + tw.to.id + ' ' + tw.value + ' ' + new Date(tw.createdAt).getTime() + ' ';
            const nonce = HashProvider.findNonce(text);
            console.log('nonce: ' + nonce);
            tw.nonce = nonce.toString();
            console.log('nonce: ' + nonce);
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
            permutation_nonce: tw.permutation_nonce,
        }
    }

    save(transactionWaiting: TransactionsWaiting) {
        return this.transactionsWaitingRepository.save(transactionWaiting);
    }

    async generateSignature(generateSignatureDto: GenerateSignatureDto, userId: number) {
        const user_from = await this.userService.findOne(userId);
        const user_to = await this.userService.findOne(generateSignatureDto.to);
        let text = 'Time: ' + new Date().getTime() + ' | From: ' + user_from.email + ' | To: ' + user_to.email + ' | Value: ' + generateSignatureDto.value;
        const signature = RsaProvider.encrypt(text, user_from.private_key);
        return {
            message: 'ok',
            text: text,
            signature: signature,
        }
    }

    getPercentageFee() {
        return {
            message: 'ok',
            percentage_fee: HashProvider.percentageFee,
        }
    }

    getSignature(getSignatureDto: GetSignatureDto) {
        let publicKey = getSignatureDto.public_key;
        let signature = getSignatureDto.signature;
        let data = RsaProvider.decrypt(signature, publicKey);
        return {
            message: 'ok',
            data: data,
        }
    }
}
