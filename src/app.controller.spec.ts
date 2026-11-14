import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    controller = module.get<AppController>(AppController);
  });
  it('returns API information', () => {
    expect(controller.getHello()).toEqual({
      name: 'Task Management System API',
      version: '1.0.0',
      status: 'running',
    });
  });
});
