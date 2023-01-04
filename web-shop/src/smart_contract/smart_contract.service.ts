import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Transaction} from "../transactions/entities/transaction.entity";
import {UpdateSmartContractDto} from "./dto/update-smart_contract.dto";
import {CreateSmartContractDto} from "./dto/create-smart_contract.dto";
import {UserService} from "../user/user.service";
import {CreateTransactionDto} from "../transactions/dto/create-transaction.dto";
import {FontsService} from "../fonts/fonts.service";
import {TransactionsService} from "../transactions/transactions.service";
import {AxiosRequestConfig} from "axios/index";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class SmartContractService {
  constructor(@InjectRepository(Transaction) private smartContactRepository: Repository<Transaction>,
              private readonly userService: UserService,
              private readonly fontService: FontsService,
              private readonly transactionService: TransactionsService,
              private readonly  httpService: HttpService
              ) {}

  async create(createSmartContactDto: CreateSmartContractDto, id: number) {
    let createTransactionDto = new CreateTransactionDto();
    createTransactionDto.to_id = createSmartContactDto.to;
    createTransactionDto.from_id = id;
    createTransactionDto.value = createSmartContactDto.value;
    createTransactionDto.font_id = createSmartContactDto.font_id;
    createTransactionDto.transaction_id_1 = 1;
    createTransactionDto.transaction_id_2 = 2;

    let checkConnect = await this.userService.checkConnectUserToHaiNamCoin(id);
    // if (checkConnect.message === 'error')
      return checkConnect;

    return await this.transactionService.create(createTransactionDto);
  }

  async transaction(from_id: number, private_key:string, to_id: number, public_key: number, value: number) {
    const user_from = await this.userService.findOne(from_id);
    const user_to = await this.userService.findOne(to_id);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${user_from.access_token}`,
      },
      url:'http://localhost:3000/transactions-waiting',
      data: {
        "to": user_to.hainamcoin_id,
        "value": value,
        "private_key": private_key,
        "public_key": public_key
      },
      method: 'GET',
    }

    try {
      const response = await this.httpService.request(config).toPromise();
      if (response.data.user)
        return response.data;
    }
    catch (e) {
      return {
        message: 'error',
        error: 'Access token is not correct',
      }
      console.log(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} smartContact`;
  }

  update(id: number, updateSmartContactDto: UpdateSmartContractDto) {
    return `This action updates a #${id} smartContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} smartContact`;
  }
}
