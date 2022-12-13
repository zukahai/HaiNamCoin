import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmTransactionsController } from './confirm_transactions.controller';
import { ConfirmTransactionsService } from './confirm_transactions.service';

describe('ConfirmTransactionsController', () => {
  let controller: ConfirmTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmTransactionsController],
      providers: [ConfirmTransactionsService],
    }).compile();

    controller = module.get<ConfirmTransactionsController>(ConfirmTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
