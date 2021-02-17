import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
} from '@angular/common/http';

import { AppService } from './app.service';

describe('AppService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(AppService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should fetchAll', () => {
    const mockTodoItems = [
      { title: 'xxx', description: 'xxx' },
      { title: 'xxx', description: 'xxx' },
    ];
    service.fetchAll().subscribe((items) => {
      expect(items.length).toBe(2);
    });

    const req = httpTestingController.expectOne('/api/todos/all');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodoItems);
  });

  it('should fetchById', () => {
    const mockTodoItem = { title: 'xxx', description: 'xxx' };
    service.fetchById(1).subscribe((item) => {
      expect(item).toEqual(mockTodoItem);
    });

    const req = httpTestingController.expectOne('/api/todos/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodoItem);
  });

  it('should createOne', () => {
    const mockTodoItem = { title: 'xxx', description: 'xxx' };
    service.createOne(mockTodoItem).subscribe((item) => {
      expect(item).toEqual(mockTodoItem);
    });

    const req = httpTestingController.expectOne('/api/todos/create');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTodoItem);
  });

  it('should updateOne', () => {
    const mockTodoItem = { id: 1, title: 'xxx', description: 'xxx' };
    service.updateOne(mockTodoItem).subscribe((item) => {
      expect(item).toEqual(mockTodoItem);
    });

    const req = httpTestingController.expectOne('/api/todos/update');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTodoItem);
  });

  it('should deleteOne', () => {
    const mockTodoItem = { title: 'xxx', description: 'xxx' };
    service.deleteOne({ id: 1 }).subscribe((item) => {
      expect(item).toEqual(mockTodoItem);
    });

    const req = httpTestingController.expectOne('/api/todos/delete');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTodoItem);
  });
});
