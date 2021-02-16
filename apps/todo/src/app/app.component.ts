import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  selectedTodo: TodoItemBase = {
    id: 1,
    title: 'dddd',
    description: 'fsgdsd',
  };
  // selectedTodo: TodoItemBase;

  // 默认为创建模式
  createMode = true;

  isModalVisible = true;
  isModalOkLoading = false;

  validateForm!: FormGroup;

  constructor(
    private readonly appService: AppService,
    private readonly formBuilder: FormBuilder
  ) {}

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
    this.validateForm = this.formBuilder.group({
      title: [
        null,
        [Validators.required, Validators.min(2), Validators.max(20)],
      ],
      // 非必填项似乎不能这么用 得手写验证器了
      description: [null, [Validators.min(2), Validators.max(30)]],
    });
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

  updateOne(updateParams: UpdateTodoDTO) {
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

  fakeUpdate(id: number) {
    const mockUpdated: TodoItemBase = {
      id,
      title: `Updated${Math.floor(Math.random() * 10000)}`,
      description: '西内西内西内',
    };
    this.appService.updateOne(mockUpdated).subscribe(() => {
      this.isModalVisible = false;
      this.initData();
    });
  }

  fakeDelete(id: number) {
    this.deleteOne({ id });
  }

  fakeCheckDetail(id: number) {
    this.createMode = false;
    this.appService.fetchById(id).subscribe((todo) => {
      this.selectedTodo = todo;
      this.validateForm.setValue({
        title: todo.title,
        description: todo.description,
      });
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

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
