import { Injectable } from '@nestjs/common';
import { CreateAutoBankDto } from './dto/create-auto-bank.dto';
import { UpdateAutoBankDto } from './dto/update-auto-bank.dto';
const axios = require('axios');

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

    async getHistory(bankName: string, token: string) {
        const password = 'Zuka030203';
        const numberBank = '5563331';
        const apiPath = [];
        apiPath['ACB'] = `https://api.web2m.com/historyapiacb/${password}/${numberBank}/${token}`;

        console.log(apiPath[bankName]);

        const listTransactions = await axios
            .get(apiPath[bankName], {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data);
                return response.data;
            });

        return listTransactions;
    }

    async callApi() {
        const { data } = await axios.get(
            'https://api.web2m.com/historyapiacb/Zuka030203/5563331/FE419019-6E72-16AC-6535-5353729292CA',
        );
        return data;
    }

    update(id: number, updateAutoBankDto: UpdateAutoBankDto) {
        return `This action updates a #${id} autoBank`;
    }

    remove(id: number) {
        return `This action removes a #${id} autoBank`;
    }
}
