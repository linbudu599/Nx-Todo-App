import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DeleteTodoDTO,
  TaggedTodoItem,
  TodoItemBase,
  UpdateTodoDTO,
} from '@todoapp/dto';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'todoapp-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.less'],
})
export class TodoItemComponent implements OnInit {
  @Input() todos: TaggedTodoItem[];

  @Output() updateEvt = new EventEmitter<UpdateTodoDTO>();
  @Output() removeEvt = new EventEmitter<DeleteTodoDTO>();

  @Output() checkDetailEvt = new EventEmitter<number>();

  itemHighlightColor: string;
  itemDefaultHighlightColor?: string;

  ngOnInit(): void {
    this.itemHighlightColor = 'steelblue';
    console.log('TodoItemComponent Init');
  }

  constructor(private readonly nzMessageService: NzMessageService) {}

  todoItemTracker(_idx: number, item: TodoItemBase): number {
    return item.id;
  }

  confirmDelete(id: number, title: string) {
    this.removeEvt.emit({ id });
    this.nzMessageService.info(`TODO ${title} 已被删除`);
  }

  cancelDelete() {
    this.nzMessageService.info('取消删除');
  }

  checkDetail(id: number) {
    this.checkDetailEvt.emit(id);
  }
}
