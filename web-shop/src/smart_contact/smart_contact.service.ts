import { Injectable } from '@nestjs/common';
import { CreateSmartContactDto } from './dto/create-smart_contact.dto';
import { UpdateSmartContactDto } from './dto/update-smart_contact.dto';

@Injectable()
export class SmartContactService {
  create(createSmartContactDto: CreateSmartContactDto) {
    return 'This action adds a new smartContact';
  }

  findAll() {
    return `This action returns all smartContact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smartContact`;
  }

  update(id: number, updateSmartContactDto: UpdateSmartContactDto) {
    return `This action updates a #${id} smartContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} smartContact`;
  }
}
