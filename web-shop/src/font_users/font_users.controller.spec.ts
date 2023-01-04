import { Test, TestingModule } from '@nestjs/testing';
import { FontUsersController } from './font_users.controller';
import { FontUsersService } from './font_users.service';

describe('FontUsersController', () => {
  let controller: FontUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FontUsersController],
      providers: [FontUsersService],
    }).compile();

    controller = module.get<FontUsersController>(FontUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
