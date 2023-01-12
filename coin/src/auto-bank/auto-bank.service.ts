import { Injectable } from '@nestjs/common';
import { CreateAutoBankDto } from './dto/create-auto-bank.dto';
import { UpdateAutoBankDto } from './dto/update-auto-bank.dto';
import axios from 'axios';

@Injectable()
export class AutoBankService {
    create(createAutoBankDto: CreateAutoBankDto) {
        return 'This action adds a new autoBank';
    }

    findAll() {
        return `This action returns all autoBank`;
    }

    findOne(id: number) {
        return `This action returns a #${id} autoBank`;
    }

    getHistory(bankName: string, token: string) {
        const password = 'Zuka030203';
        const numberBank = '5563331';
        const apiPath = [];
        apiPath['ACB'] = `https://api.web2m.com/historyapiacb/${password}/${numberBank}/${token}`;

        const listTransactions = axios.get(apiPath[bankName]).then((response) => {
            console.log(response);
            return response.data;
        });

        return listTransactions;
    }

    update(id: number, updateAutoBankDto: UpdateAutoBankDto) {
        return `This action updates a #${id} autoBank`;
    }

    remove(id: number) {
        return `This action removes a #${id} autoBank`;
    }
}
