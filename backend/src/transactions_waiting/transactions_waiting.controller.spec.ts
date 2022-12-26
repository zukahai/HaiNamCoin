import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsWaitingController } from './transactions_waiting.controller';
import { TransactionsWaitingService } from './transactions_waiting.service';

describe('TransactionsWaitingController', () => {
  let controller: TransactionsWaitingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsWaitingController],
      providers: [TransactionsWaitingService],
    }).compile();

    controller = module.get<TransactionsWaitingController>(TransactionsWaitingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
