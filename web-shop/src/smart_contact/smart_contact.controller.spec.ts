import { Test, TestingModule } from '@nestjs/testing';
import { SmartContactController } from './smart_contact.controller';
import { SmartContactService } from './smart_contact.service';

describe('SmartContactController', () => {
  let controller: SmartContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartContactController],
      providers: [SmartContactService],
    }).compile();

    controller = module.get<SmartContactController>(SmartContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
