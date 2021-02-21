import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';
import { CreateTodoDTO, TodoItemBase } from '@todoapp/dto';

import { TodoItemComponent } from './todo-item.component';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PopUpService } from '../pop-up/pop-up.service';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('TodoItemComponent', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [NzMessageModule],
      providers: [
        TodoItemComponent,
        { provide: NzMessageService, useClass: NzMessageService },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: PopUpService, useClass: PopUpService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    component.todos = [];
  });

  it('should create todo item ', () => {
    expect(component).toBeDefined();
    expect(fixture).toBeDefined();
    expect(compiled).toBeDefined();
  });

  it('should render todos', () => {});
});
