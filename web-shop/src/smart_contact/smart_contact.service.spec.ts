import { Test, TestingModule } from '@nestjs/testing';
import { SmartContactService } from './smart_contact.service';

describe('SmartContactService', () => {
  let service: SmartContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartContactService],
    }).compile();

    service = module.get<SmartContactService>(SmartContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
