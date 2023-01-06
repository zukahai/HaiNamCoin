import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncryptionAlgorithmsService } from './encryption_algorithms.service';
import { CreateEncryptionAlgorithmDto } from './dto/create-encryption_algorithm.dto';
import { UpdateEncryptionAlgorithmDto } from './dto/update-encryption_algorithm.dto';
import {ApiTags} from "@nestjs/swagger";
import {Public} from "../auth/decorators/custom.decarator";

@Controller('encryption-algorithms')
@ApiTags('Encryption Algorithms')
export class EncryptionAlgorithmsController {
  constructor(private readonly encryptionAlgorithmsService: EncryptionAlgorithmsService) {}

  @Public()
  @Get(':text')
  haizuka(@Param('text') text: string) {
    return this.encryptionAlgorithmsService.haizuka(text);
  }
}
