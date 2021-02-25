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
import { SharedModule } from '@todoapp/shared';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

describe('TodoItemComponent', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [
        NzMessageModule,
        SharedModule,
        NzEmptyModule,
        NzTagModule,
        NzPipesModule,
        NzPopconfirmModule,
        NzButtonModule,
      ],
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

  it('should render empty on no items only', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('h4')).toBeDefined();
    expect(compiled.querySelector('p.empty-tip-bot')).toBeDefined();
    expect(compiled.querySelector('h4').textContent).toBe(
      "It seems that you don't have any todos yet ..."
    );
    expect(compiled.querySelector('p.empty-tip-bot').textContent).toContain(
      'Use button above to create a todo item.'
    );

    component.todos = [
      { id: 1, title: 'xxx', description: 'xxx', tag: '', tagText: '' },
    ];
    fixture.detectChanges();

    expect(compiled.querySelector('h4')).toBeNull();
    expect(compiled.querySelector('p.empty-tip-bot')).toBeNull();
  });

  it('should render items correctly', () => {
    component.todos = [
      { id: 1, title: 'xxx', description: 'xxx', tag: '', tagText: '' },
    ];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('div.todo-item-container').length).toBe(1);

    component.todos = [
      { id: 1, title: 'xxx', description: 'xxx', tag: '', tagText: '' },
      { id: 2, title: 'xxx', description: '', tag: '', tagText: '' },
    ];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('div.todo-item-container').length).toBe(2);
    expect(compiled.querySelectorAll('.todo-item-tag-span').length).toBe(2);
    expect(compiled.querySelectorAll('.todo-item-title').length).toBe(2);
    expect(compiled.querySelectorAll('.todo-item-description').length).toBe(2);
    expect(compiled.querySelectorAll('.todo-item-operation').length).toBe(2);

    expect(
      compiled.querySelectorAll('.todo-item-title')[0].textContent
    ).toContain('xxx');
    expect(
      compiled.querySelectorAll('.todo-item-description')[0].textContent
    ).toContain('xxx');
    expect(
      compiled.querySelectorAll('.todo-item-title')[1].textContent
    ).toContain('xxx');
    expect(
      compiled.querySelectorAll('.todo-item-description')[1].textContent
    ).toContain('暂无描述');
  });
});
