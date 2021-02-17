import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
  UpdateTodoDTO,
  TaggedTodoItem,
} from '@todoapp/dto';
import { AppService } from './app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  todos: TaggedTodoItem[];

  selectedTodo: TodoItemBase;

  createMode = true;

  isModalVisible = false;
  isModalOkLoading = false;

  validateForm!: FormGroup;

  constructor(
    private readonly appService: AppService,
    private readonly formBuilder: FormBuilder,
    private readonly nzMessageService: NzMessageService
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
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],

      description: [null, [Validators.minLength(2), Validators.maxLength(30)]],
    });
  }

  handleRemove(deleteEvtParams: DeleteTodoDTO) {
    this.appService.deleteOne(deleteEvtParams).subscribe(() => {
      this.initData();
    });
  }

  handleCheckDetail(itemId: number) {
    this.createMode = false;
    this.appService.fetchById(itemId).subscribe((todo) => {
      this.selectedTodo = todo;
      this.validateForm.setValue({
        title: todo.title,
        description: todo.description,
      });
      this.isModalVisible = true;
    });
  }

  initData(): void {
    this.appService.fetchAll().subscribe((todos) => {
      this.todos = todos;
    });
  }

  createItem(createParams: CreateTodoDTO) {
    this.appService.createOne(createParams).subscribe(() => {
      this.initData();
    });
  }

  updateItem(updateParams: UpdateTodoDTO) {
    this.appService.updateOne(updateParams).subscribe(() => {
      this.initData();
    });
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  fakeAdd() {
    this.createItem({ title: '欧拉欧拉欧拉' });
  }

  realAdd() {
    this.createMode = true;
    this.validateForm.setValue({ title: '整活', description: '' });
    this.isModalVisible = true;
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

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const { title, description = '' } = this.validateForm.value;

    if (this.createMode) {
      this.createItem({ title, description });
    } else {
      const { id } = this.selectedTodo;
      this.updateItem({ id, title, description });
    }

    this.isModalVisible = false;
  }
}
