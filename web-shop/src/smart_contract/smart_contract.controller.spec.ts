import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractController } from './smart_contract.controller';
import { SmartContractService } from './smart_contract.service';

describe('SmartContractController', () => {
  let controller: SmartContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartContractController],
      providers: [SmartContractService],
    }).compile();

    controller = module.get<SmartContractController>(SmartContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
