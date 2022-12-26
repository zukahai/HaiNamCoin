import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsWaitingService } from './transactions_waiting.service';

describe('TransactionsWaitingService', () => {
  let service: TransactionsWaitingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsWaitingService],
    }).compile();

    service = module.get<TransactionsWaitingService>(TransactionsWaitingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
