import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTodoDTO, TodoItemBase, UpdateTodoDTO } from '@todoapp/dto';

export type SubmitEvt =
  | {
      isCreate: true;
      payload: CreateTodoDTO;
    }
  | {
      isCreate: false;
      payload: UpdateTodoDTO;
    };

@Component({
  selector: 'todoapp-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less'],
})
export class TodoFormComponent implements OnInit {
  isModalVisible: boolean;
  createMode: boolean;

  @Output() submitEvt = new EventEmitter<SubmitEvt>();

  validateForm!: FormGroup;
  selectedTodo: TodoItemBase;

  ngOnInit(): void {
    console.log('TodoFormComponent Init');
  }

  constructor(private readonly formBuilder: FormBuilder) {
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

  handleModelClose() {
    this.isModalVisible = false;
  }

  handleModelOpen(create: boolean, selectedTodo: Omit<TodoItemBase, 'id'>) {
    this.createMode = create;
    this.selectedTodo = selectedTodo as TodoItemBase;
    // 直接setValue(selectedTodo) 会导致在打开详情时多一个id项，报错找不到此表单控制
    this.validateForm.setValue({
      title: selectedTodo.title,
      description: selectedTodo.description,
    });
    this.isModalVisible = true;
  }

  submitForm() {
    this.submitEvt.emit;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const { title, description = '' } = this.validateForm.value;
    if (this.createMode) {
      this.submitEvt.emit({ isCreate: true, payload: { title, description } });
    } else {
      const { id } = this.selectedTodo;
      this.submitEvt.emit({
        isCreate: false,
        payload: { id, title, description },
      });
    }
    this.isModalVisible = false;
  }
}
