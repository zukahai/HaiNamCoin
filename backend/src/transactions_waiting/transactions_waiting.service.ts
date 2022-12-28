import { Injectable } from '@nestjs/common';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TransactionsWaiting} from "./entities/transactions_waiting.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";

@Injectable()
export class TransactionsWaitingService {
  constructor(
    @InjectRepository(TransactionsWaiting) private transactionsWaitingRepository: Repository<TransactionsWaiting>,
    private readonly userService: UserService
  ) {}

  async create(createTransactionsWaitingDto: CreateTransactionsWaitingDto) {

    const user_form = await this.userService.findOne(createTransactionsWaitingDto.to);
    const user_to = await this.userService.findOne(createTransactionsWaitingDto.to);
    let totalValue = await this.userService.getTotalMoney(createTransactionsWaitingDto.from);

    if (totalValue < createTransactionsWaitingDto.value) {
      return {
        message: "error",
        error: "Money is not enough " + totalValue + " < " + createTransactionsWaitingDto.value
      }
    }

    const user_by_public_key = await this.userService.findByPublicKey(createTransactionsWaitingDto.public_key);

    if (user_by_public_key != null && user_to != null && user_by_public_key.id == user_to.id) {
      return {
        message: "ok",
        data: await this.transactionsWaitingRepository.save({
          from: await this.userService.findOne(createTransactionsWaitingDto.from),
          to: await this.userService.findOne(createTransactionsWaitingDto.to),
          value: createTransactionsWaitingDto.value,
        })
      }
    }
    return {
      message: "error",
      error: 'Public key not match'
    };
  }

  findAll() {
    return `This action returns all transactionsWaiting`;
  }

  async findOne(id: number) {
    return await this.transactionsWaitingRepository.findOne({
      where: {
        id: id
      },relations:{join_confirm_transaction: true}
    });
  }

  update(id: number, updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
    return `This action updates a #${id} transactionsWaiting`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionsWaiting`;
  }
}
