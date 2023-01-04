import { Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Font} from "./entities/font.entity";
import {AxiosRequestConfig} from "axios";
import {InfomaintionProvider} from "../provider/infomaintion.provider";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class FontsService {
  constructor(@InjectRepository(Font) private fontRepository: Repository<Font>,
              private readonly  httpService: HttpService) {
  }

  create(createFontDto: CreateFontDto) {
    return 'This action adds a new font';
  }

  async findAll(userId: number) {
    if (!userId)
      return await this.fontRepository.find({
          relations: ['user']
      });
    return 'This action returns all fonts';
  }

  async findOne(id: number) {
    let font = await this.fontRepository.findOne({
      where: {
        id: id
      },
      relations: ['user', 'font_users']
    });
    const percentage_fee = await this.getPercentageFee();
    const price = (font.price + InfomaintionProvider.profit * font.price) / (1 - percentage_fee);
    const price_license = (font.price_license + InfomaintionProvider.profit * font.price_license) / (1 - percentage_fee);
    const font_new = {
      ...font,
      price_bank: price,
      price_license_bank: price_license,
      quantity_purchased: font.font_users.length,
    }
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
