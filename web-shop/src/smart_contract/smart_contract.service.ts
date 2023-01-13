import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UpdateSmartContractDto } from './dto/update-smart_contract.dto';
import { CreateSmartContractDto } from './dto/create-smart_contract.dto';
import { UserService } from '../user/user.service';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { FontsService } from '../fonts/fonts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AxiosRequestConfig } from 'axios/index';
import { HttpService } from '@nestjs/axios';
import { InfomaintionProvider } from '../provider/infomaintion.provider';
import { FontUsersService } from '../font_users/font_users.service';

@Injectable()
export class SmartContractService {
    constructor(
        @InjectRepository(Transaction) private smartContactRepository: Repository<Transaction>,
        private readonly userService: UserService,
        private readonly fontService: FontsService,
        private readonly fonrUserService: FontUsersService,
        private readonly transactionService: TransactionsService,
        private readonly httpService: HttpService,
    ) {}

    async create(createSmartContactDto: CreateSmartContractDto, id: number) {
        let createTransactionDto = new CreateTransactionDto();
        createTransactionDto.to_id = createSmartContactDto.to;
        createTransactionDto.from_id = id;
        createTransactionDto.value = createSmartContactDto.value;
        createTransactionDto.font_id = createSmartContactDto.font_id;
        createTransactionDto.type = createSmartContactDto.type;
        createTransactionDto.transaction_id_1 = 1;
        createTransactionDto.transaction_id_2 = 2;

        const value1 = createSmartContactDto.value / (1 + InfomaintionProvider.profit);
        const value2 = createSmartContactDto.value - value1;

        let checkConnect = await this.userService.checkConnectUserToHaiNamCoin(id);
        if (checkConnect.message === 'error') return checkConnect;
        else {
            const user_from = await this.userService.findOne(id);
            const User_from_hainamcoin = await this.getUserHaiNamCoinByAccessToken(user_from.access_token);
            const user_to = await this.userService.findOne(createSmartContactDto.to);
            let User_to_hainamcoin = await this.getUserHaiNamCoinById(user_to.hainamcoin_id);

            if (User_from_hainamcoin.totalMoney < value1 + value2) {
                return {
                    message: 'error',
                    error: 'Value is not enough',
                };
            }

            createTransactionDto.transaction_id_1 = await this.transaction(
                User_from_hainamcoin,
                User_to_hainamcoin,
                createSmartContactDto.private_key,
                value1,
                user_from.access_token,
            );

            User_to_hainamcoin = await this.getUserHaiNamCoinById(InfomaintionProvider.hainamcoin_id);
            createTransactionDto.transaction_id_2 = await this.transaction(
                User_from_hainamcoin,
                User_to_hainamcoin,
                createSmartContactDto.private_key,
                value2,
                user_from.access_token,
            );
        }
        return await this.transactionService.create(createTransactionDto);
    }

    async transaction(from: any, to: any, private_key: string, value: number, access_token: string) {
        let signature = await this.getSignature(to.id, value, access_token);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: 'http://localhost:3000/transactions-waiting',
            data: {
                to: +to.id,
                value: +value,
                private_key: private_key,
                public_key: to.public_key,
                signature: signature,
            },
            method: 'POST',
        };

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data) {
                const transaction_id = response.data.data.id;
                return transaction_id;
            }
        } catch (e) {
            return {
                message: 'error',
                error: 'Access token is not correct',
            };
        }
    }

    async getUserHaiNamCoinByAccessToken(access_token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: 'http://localhost:3000/user/current-user',
            method: 'GET',
        };

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data.user) return response.data.user;
        } catch (e) {
            return {
                message: 'error',
                error: 'Access token is not correct',
            };
            // console.log(e);
        }
    }

    async getSignature(to: any, value: number, access_token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: InfomaintionProvider.path_hnc + '/transactions-waiting/generate-signature',
            data: {
                to: 2,
                value: 100,
            },
            method: 'POST',
        };

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data) {
                return response.data.signature;
            }
        } catch (e) {
            return {
                message: 'error',
                error: 'Access token is not correct',
            };
        }
    }

    async getUserHaiNamCoinById(id: number) {
        const config: AxiosRequestConfig = {
            url: 'http://localhost:3000/user/' + id,
            method: 'GET',
        };

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data.user) return response.data.user; //
        } catch (e) {
            // console.log(e.response.data);
            return {
                message: 'error',
                error: 'Access token is not correct',
            };
        }
    }

    async getPercentageFee() {
        const config: AxiosRequestConfig = {
            url: InfomaintionProvider.path_hnc + '/transactions-waiting/percentage-fee',
            method: 'GET',
        };

        try {
            const response = await this.httpService.request(config).toPromise();
            if (response.data) return response.data.percentage_fee;
        } catch (e) {
            console.log(e);
            return {
                message: 'error',
                error: 'Not get percentage fee',
            };
        }
    }

    async checkTransaction(id: number) {
        let transaction = await this.transactionService.findOne(id);
        console.log('transaction ', transaction);
        const tw_1 = await this.transactionService.checkTransactionHNC(transaction.transaction_id_1);
        const tw_2 = await this.transactionService.checkTransactionHNC(transaction.transaction_id_2);
        if (transaction) {
            if (tw_1.status === 1 && tw_2.status === 1) {
                transaction.status = transaction.status + 1;
                await this.transactionService.update(transaction);
                if (transaction.status === 1) {
                    const user = await this.userService.findOne(transaction.from.id);
                    let font = await this.fontService.findOne(transaction.font.id);
                    if (transaction.type === 1) {
                        await this.fonrUserService.createByFontUser(user, font);
                    } else if (transaction.type === 2) {
                        let font = await this.fontService.findOne(transaction.font.id);
                        font.user = user;
                        await this.fontService.update(font);
                    }
                }
                return {
                    message: 'ok',
                };
            }
        }
        return {
            message: 'error',
            error: 'An incomplete transaction exists',
            transaction_Waiting_1: tw_1.status,
            transaction_Waiting_2: tw_2.status,
        };
    }

    async checkTransactionFont(id: number) {
        let result = [];
        const font = await this.fontService.findOne(id);
        if (font) {
            const transaction_waiting = font.transaction_waiting;
            for (let i = 0; i < transaction_waiting.length; i++) {
                result.push({
                    id: transaction_waiting[i].id,
                    status: await this.checkTransaction(transaction_waiting[i].id),
                });
            }
        }
        return result;
    }
}
