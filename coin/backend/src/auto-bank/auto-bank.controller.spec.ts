import { Test, TestingModule } from '@nestjs/testing';
import { AutoBankController } from './auto-bank.controller';
import { AutoBankService } from './auto-bank.service';

describe('AutoBankController', () => {
  let controller: AutoBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoBankController],
      providers: [AutoBankService],
    }).compile();

    controller = module.get<AutoBankController>(AutoBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
