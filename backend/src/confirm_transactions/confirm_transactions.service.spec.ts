import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmTransactionsService } from './confirm_transactions.service';

describe('ConfirmTransactionsService', () => {
  let service: ConfirmTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmTransactionsService],
    }).compile();

    service = module.get<ConfirmTransactionsService>(ConfirmTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
