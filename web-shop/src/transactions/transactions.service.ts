import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {FontsService} from "../fonts/fonts.service";
import {AxiosRequestConfig} from "axios";
import {InfomaintionProvider} from "../provider/infomaintion.provider";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(Transaction) private smartContactRepository: Repository<Transaction>,
              private readonly userService: UserService,
              private readonly fontService: FontsService,
              private readonly  httpService: HttpService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {

    return this.smartContactRepository.save({
        transaction_id_1: createTransactionDto.transaction_id_1,
        transaction_id_2: createTransactionDto.transaction_id_2,
        font: await this.fontService.findOne(createTransactionDto.font_id),
        from: await this.userService.findOne(createTransactionDto.from_id),
        to: await this.userService.findOne(createTransactionDto.to_id),
        value: createTransactionDto.value,
        type: createTransactionDto.type,
    });
  }

  findAll() {
    return this.smartContactRepository.find({
        relations: ['from', 'to', 'font']
    });
  }

  async findOne(id: number) {
    return await this.smartContactRepository.findOne({
        where: {
            id: id
        },
        relations: ['font', 'from', 'to']
    })
  }

  async checkTransactionHNC(id: number) {
      const config: AxiosRequestConfig = {
          url: InfomaintionProvider.path_hnc + '/transactions-waiting/' + id,
          method: 'GET',
      }

      try {
          const response = await this.httpService.request(config).toPromise();
          if (response.data)
              return response.data;
      }
      catch (e) {
          // console.log(e.response.data);
          return {
              message: 'error',
              error: 'Transaction not found',
          }
      }
  }
}
