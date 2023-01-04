import { Test, TestingModule } from '@nestjs/testing';
import { FontUsersService } from './font_users.service';

describe('FontUsersService', () => {
  let service: FontUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FontUsersService],
    }).compile();

    service = module.get<FontUsersService>(FontUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
