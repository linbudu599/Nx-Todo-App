import { Component, OnInit } from '@angular/core';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
  UpdateTodoDTO,
} from '@todoapp/dto';
import { AppService } from './app.service';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'todo';

  todos: TodoItemBase[];

  selectedTodo: TodoItemBase;

  isModalVisible = false;
  isModalOkLoading = false;

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

  checkDetail(id: number) {
    this.appService.fetchById(id).subscribe((todo) => {
      // TODO: 打开弹窗
    });
  }

  create(createParams: CreateTodoDTO) {
    this.appService.createOne(createParams).subscribe(() => {
      this.initData();
    });
  }

  update(updateParams: UpdateTodoDTO) {
    this.appService.updateOne(updateParams).subscribe(() => {
      this.initData();
    });
  }

  deleteOne(deleteParams: DeleteTodoDTO) {
    this.appService.deleteOne(deleteParams).subscribe(() => {
      this.initData();
    });
  }

  fakeAdd() {
    this.create({ title: '欧拉欧拉欧拉' });
  }

  fakeDelete(id: number) {
    this.deleteOne({ id });
  }

  fakeCheckDetail(id: number) {
    this.appService.fetchById(id).subscribe((todo) => {
      this.selectedTodo = todo;
      console.log(todo);
      this.isModalVisible = true;
    });
  }

  handleCancel() {
    // TODO: 弹窗: 操作取消
    this.isModalVisible = false;
  }

  handleOk() {
    // TODO: 弹窗: 操作成功
    this.isModalVisible = false;
  }
}
