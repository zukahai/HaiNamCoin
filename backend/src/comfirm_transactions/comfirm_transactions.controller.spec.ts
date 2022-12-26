import { Test, TestingModule } from '@nestjs/testing';
import { ComfirmTransactionsController } from './comfirm_transactions.controller';
import { ComfirmTransactionsService } from './comfirm_transactions.service';

describe('ComfirmTransactionsController', () => {
  let controller: ComfirmTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComfirmTransactionsController],
      providers: [ComfirmTransactionsService],
    }).compile();

    controller = module.get<ComfirmTransactionsController>(ComfirmTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
