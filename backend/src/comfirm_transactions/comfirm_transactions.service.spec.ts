import { Test, TestingModule } from '@nestjs/testing';
import { ComfirmTransactionsService } from './comfirm_transactions.service';

describe('ComfirmTransactionsService', () => {
  let service: ComfirmTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComfirmTransactionsService],
    }).compile();

    service = module.get<ComfirmTransactionsService>(ComfirmTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
