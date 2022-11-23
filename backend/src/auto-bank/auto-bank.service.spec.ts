import { Test, TestingModule } from '@nestjs/testing';
import { AutoBankService } from './auto-bank.service';

describe('AutoBankService', () => {
  let service: AutoBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoBankService],
    }).compile();

    service = module.get<AutoBankService>(AutoBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
