import { Component, OnInit, ViewChild } from '@angular/core';

import {
  CreateTodoDTO,
  DeleteTodoDTO,
  UpdateTodoDTO,
  TaggedTodoItem,
} from '@todoapp/dto';
import { TodoFormComponent, SubmitEvt } from '@todoapp/ui-components';

import { AppService } from './app.service';

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

  handleRemove(deleteEvtParams: DeleteTodoDTO): void {
    this.appService.deleteOne(deleteEvtParams).subscribe(() => {
      this.initData();
    });
  }

  handleCheckDetail(itemId: number): void {
    this.appService.fetchById(itemId).subscribe((todo) => {
      this.formComponent.handleModelOpen(false, todo);
    });
  }

  handleFakeAdd(): void {
    this.createItem({
      title: '欧拉欧拉欧拉',
      description: '木大木大木大木大木大',
    });
  }

  handleRealAdd(): void {
    this.formComponent.handleModelOpen(true, { title: '', description: '' });
  }

  handleSubmit(evt: SubmitEvt) {
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
