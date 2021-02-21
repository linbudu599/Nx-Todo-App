import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { CreateTodoDTO, TodoItemBase } from '@todoapp/dto';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({ selector: 'todoapp-todo-item', template: '' })
class TodoItemStubComponent {}

@Component({ selector: 'todoapp-todo-form', template: '' })
class TodoFormStubComponent {}

class MockAppService {
  todos: TodoItemBase[] = [
    { id: 1, title: 'title', description: 'description' },
    { id: 2, title: 'title', description: 'description' },
    { id: 3, title: 'title', description: 'description' },
  ];

  fetchAll() {
    return of(this.todos);
  }

  createOne(createParams: CreateTodoDTO) {
    this.todos.push({ id: 999, title: 'xxx', description: 'xxx' });
    return of(this.todos);
  }
}

describe.only('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        // use stub comp or ignore unknown elements by NO_ERRORS_SCHEMA
        TodoItemStubComponent,
        TodoFormStubComponent,
      ],
      providers: [
        AppComponent,
        { provide: AppService, useClass: MockAppService },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
    expect(fixture).toBeDefined();
    expect(compiled).toBeDefined();
  });

  it(`should have title 'Your Nx Todo-List'`, () => {
    expect(component.title).toBe('Nx Todo-List');
    expect(compiled.querySelector('h2').textContent).toBe('Nx Todo-List');

    component.title = 'Changed!';
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toBe('Changed!');
  });

  it(`should fetch todos`, () => {
    component.ngOnInit();
    expect(component.todos.length).toBe(3);
  });

  it(`should render Mock/Real Button`, () => {
    component.ngOnInit();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain(
      '新增项(Mock)'
    );
    expect(compiled.querySelectorAll('button')[1].textContent).toContain(
      '新增项(Real)'
    );
  });

  it(`should add new todo item on Mock-Add-Button click`, () => {
    component.ngOnInit();

    const compiled: HTMLElement = fixture.nativeElement;
    const mockAddBtn = compiled.querySelectorAll('button')[0];

    mockAddBtn.click();
    expect(component.todos.length).toBe(4);

    mockAddBtn.click();
    expect(component.todos.length).toBe(5);
  });
});
