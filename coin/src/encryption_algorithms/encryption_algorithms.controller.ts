import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncryptionAlgorithmsService } from './encryption_algorithms.service';
import { CreateEncryptionAlgorithmDto } from './dto/create-encryption_algorithm.dto';
import { UpdateEncryptionAlgorithmDto } from './dto/update-encryption_algorithm.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
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

  @Public()
  @Get('check/:text')
  testHaizuka(@Param('text') text: string) {
    return this.encryptionAlgorithmsService.testHaizuka(text);
  }

  @Public()
  @Get('en-code/:text')
  @ApiOperation({summary: 'Create Encryption Algorithm'})
  enCode(@Param('text') text: string) {
    return this.encryptionAlgorithmsService.enCodeNamZ(text);
  }

  @Public()
  @Get('de-code/:text')
  @ApiOperation({summary: 'Create DeCode Algorithm'})
  deCode(@Param('text') text: string) {
    return this.encryptionAlgorithmsService.deCodeNamZ(text);
  }

  @Public()
  @Get('rsa/:text')
  @ApiOperation({summary: 'Create RSA Algorithm'})
  rsa(@Param('text') text: string) {
      return this.encryptionAlgorithmsService.rsa(text);
  }
}
