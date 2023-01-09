import { Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Font} from "./entities/font.entity";
import {AxiosRequestConfig} from "axios";
import {InfomaintionProvider} from "../provider/infomaintion.provider";
import {HttpService} from "@nestjs/axios";
import {UserService} from "../user/user.service";
import {FontUsersService} from "../font_users/font_users.service";
import {TransactionsService} from "../transactions/transactions.service";

@Injectable()
export class FontsService {
  constructor(@InjectRepository(Font) private fontRepository: Repository<Font>,
              private readonly  httpService: HttpService,
              private readonly  userService: UserService,
              private readonly fontUserService: FontUsersService) {
  }

  create(createFontDto: CreateFontDto) {
    return 'This action adds a new font';
  }

  async findAll() {
    const fonts = await this.fontRepository.find({
        relations: ['user']
    });
    let fonts_new = [];
    for (let i = 0; i < fonts.length; i++) {
        const font_new = {
            ...fonts[i],
          options: {
              value: 0,
              description: 'Have not bought yet'
          }
        }
        fonts_new.push(font_new);
    }
    return fonts_new;
  }

  async findAllByUser(user_id: number) {
    const fonts = await this.fontRepository.find({
      relations: ['user']
    });
    let fonts_new = [];
    let options = [];
    for (let i = 0; i < fonts.length; i++) {
      options.push(0);
    }
    const user = await this.userService.findOne(user_id);
    for (let i = 0; i < user.font_users.length; i++) {
      const font_user = await this.fontUserService.findOne(user.font_users[i].id);
      options[font_user.font.id] = 1;
    }
    for (let i = 0; i < user.fonts.length; i++) {
      const font = await this.findOne(user.fonts[i].id);
      options[font.id] = 2;
    }
    let description = ['Have not bought yet', 'Have bought', 'License'];
    for (let i = 0; i < fonts.length; i++) {
      fonts_new.push({
        ...fonts[i],
        options: {
            value: options[fonts[i].id],
            description: description[options[fonts[i].id]]
        }
      })
    }
    return fonts_new;
  }

  async findOne(id: number) {
    let font = await this.fontRepository.findOne({
      where: {
        id: id
      },
      relations: ['user', 'font_users', 'transactions']
    });
    delete font.user.access_token;
    delete font.user.password;
    const percentage_fee = await this.getPercentageFee();
    const price = (font.price + InfomaintionProvider.profit * font.price) / (1 - percentage_fee);
    const price_license = (font.price_license + InfomaintionProvider.profit * font.price_license) / (1 - percentage_fee);
    let transactions = [];
    for (let i = 0; i < font.transactions.length; i++) {
      if (font.transactions[i].status === 0) {
        transactions.push(font.transactions[i]);
      }
    }
    const font_new = {
      ...font,
      price_bank: price,
      price_license_bank: price_license,
      quantity_purchased: font.font_users.length,
      transaction_waiting: transactions
    }
    delete font_new.font_users;
    delete font_new.transactions;
    return font_new;
  }

  update(font: Font) {
    return this.fontRepository.save(font);
  }

  remove(id: number) {
    return `This action removes a #${id} font`;
  }

  async getPercentageFee() {
    const config: AxiosRequestConfig = {
      url: InfomaintionProvider.path_hnc + '/transactions-waiting/percentage-fee',
      method: 'GET',
    }

    try {
      const response = await this.httpService.request(config).toPromise();
      if (response.data)
        return response.data.percentage_fee;
    }
    catch (e) {
      console.log(e);
      return {
        message: 'error',
        error: 'Not get percentage fee',
      }
    }
  }
}
