import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LowdbProvider } from './app.module';
import { TodoItemBase } from '@todoapp/dto';

const mockServiceInvokeResult: TodoItemBase[] = [
  {
    id: 1,
    title: 'xx',
    description: 'xxx',
  },
];

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  const serviceMock = jest.fn().mockImplementation(() => ({
    fetchAll: [],
  }));

  jest.mock('./app.service', () => serviceMock);

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, LowdbProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('App Controller', () => {
    it('should return "Welcome to Nest + Angular!"', () => {
      expect(appController.welcome()).toBe('Welcome to Nest + Angular');
    });

    it('should return all todos', () => {
      const serviceSpy = jest
        .spyOn(appService, 'getAll')
        .mockImplementation(() => mockServiceInvokeResult);

      expect(appController.getAllTodos()).toBe(mockServiceInvokeResult);
      expect(serviceSpy).toHaveBeenCalled();
    });

    it('should return single todo or empty object', () => {
      const serviceSpy = jest
        .spyOn(appService, 'getOne')
        .mockImplementationOnce(() => mockServiceInvokeResult[0])
        .mockImplementationOnce(() => ({} as TodoItemBase));

      expect(appController.getTodosById(1)).toBe(mockServiceInvokeResult[0]);
      expect(serviceSpy).toHaveBeenCalledWith(1);

      expect(appController.getTodosById(1)).toEqual({});
      expect(serviceSpy).toHaveBeenCalledWith(1);
    });

    it('should create todo', () => {
      const serviceSpy = jest
        .spyOn(appService, 'createOne')
        .mockImplementationOnce(() => mockServiceInvokeResult[0]);

      const createParam = { title: 'xxx', description: 'xxx' };

      expect(appController.createTodo(createParam)).toBe(
        mockServiceInvokeResult[0]
      );
      expect(serviceSpy).toHaveBeenCalledWith(createParam);
    });

    it('should update todo', () => {
      const serviceSpy = jest
        .spyOn(appService, 'updateOne')
        .mockImplementationOnce(() => mockServiceInvokeResult[0]);

      const updateParam = { id: 111, title: 'xxx', description: 'xxx' };

      expect(appController.updateTodo(updateParam)).toBe(
        mockServiceInvokeResult[0]
      );
      expect(serviceSpy).toHaveBeenCalledWith(updateParam);
    });

    it('should delete todo', () => {
      const serviceSpy = jest
        .spyOn(appService, 'deleteOne')
        .mockImplementationOnce(() => mockServiceInvokeResult[0]);

      expect(appController.deleteTodo({ id: 1 })).toBe(
        mockServiceInvokeResult[0]
      );
      expect(serviceSpy).toHaveBeenCalledWith(1);
    });
  });
});
