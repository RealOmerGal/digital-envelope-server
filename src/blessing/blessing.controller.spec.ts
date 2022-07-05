import { Test, TestingModule } from '@nestjs/testing';
import { BlessingController } from './blessing.controller';
import { BlessingService } from './blessing.service';

describe('BlessingController', () => {
  let controller: BlessingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlessingController],
      providers: [BlessingService],
    }).compile();

    controller = module.get<BlessingController>(BlessingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
