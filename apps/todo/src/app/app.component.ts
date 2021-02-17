import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
  UpdateTodoDTO,
  TaggedTodoItem,
} from '@todoapp/dto';
import { AppService } from './app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
// FIXME: import
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  TodoFormComponent,
  SubmitEvt,
} from 'libs/ui-components/src/lib/todo-form/todo-form.component';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  todos: TaggedTodoItem[];

  @ViewChild(TodoFormComponent)
  private formComponent: TodoFormComponent;

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    // this.appService.fetchAll().subscribe((x) => console.log(x));
    // this.appService.fetchById(1).subscribe((x) => console.log(x));
    // this.appService
    //   .createOne({ title: 'xxx' })
    //   .subscribe((x) => console.log(x));
    // this.appService
    //   .updateOne({ id: 1, title: 'uuuuu' })
    //   .subscribe((x) => console.log(x));
    // this.appService.deleteOne({ id: 5 }).subscribe((x) => console.log(x));
    this.initData();
  }

  initData(): void {
    this.appService.fetchAll().subscribe((todos) => {
      this.todos = todos;
    });
  }

  handleRemove(deleteEvtParams: DeleteTodoDTO) {
    this.appService.deleteOne(deleteEvtParams).subscribe(() => {
      this.initData();
    });
  }

  handleCheckDetail(itemId: number) {
    this.appService.fetchById(itemId).subscribe((todo) => {
      this.formComponent.handleModelOpen(false, todo);
    });
  }

  handleFakeAdd() {
    this.createItem({
      title: '欧拉欧拉欧拉',
      description: '木大木大木大木大木大',
    });
  }

  handleRealAdd() {
    this.formComponent.handleModelOpen(true, { title: '', description: '' });
  }

  handleSubmit(evt: SubmitEvt) {
    // FIXME: error type inferrence?
    evt.isCreate
      ? this.createItem(evt.payload)
      : this.updateItem(evt.payload as UpdateTodoDTO);
  }

  private createItem(createParams: CreateTodoDTO) {
    this.appService.createOne(createParams).subscribe(() => {
      this.initData();
    });
  }

  private updateItem(updateParams: UpdateTodoDTO) {
    this.appService.updateOne(updateParams).subscribe(() => {
      this.initData();
    });
  }
}
