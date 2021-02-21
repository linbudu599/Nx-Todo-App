import { Injectable, Inject } from '@nestjs/common';
import { CreateTodoDTO, TodoItemBase, UpdateTodoDTO } from '@todoapp/dto';
import { DB_PROVIDER_TOKEN, DBType } from './constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_PROVIDER_TOKEN)
    private readonly db: DBType
  ) {}

  getAll(): TodoItemBase[] {
    return this.db.get('todos').value();
  }

  getOne(id: number): TodoItemBase {
    return this.db.get('todos').find({ id }).value();
  }

  createOne(createParams: CreateTodoDTO) {
    const id = this.db.get('todos').last().value()?.id ?? 0 + 1;
    const create = {
      id,
      title: createParams.title,
      description: createParams.description ?? '',
    };
    this.db.get('todos').push(create).write();
    return create;
  }

  updateOne(updateParams: UpdateTodoDTO) {
    let origin = this.db.get('todos').find({ id: updateParams.id });
    const merged = origin.merge(updateParams);
    origin = merged;
    origin.write();
    return merged.value();
  }

  deleteOne(id: number) {
    return this.db.get('todos').remove({ id }).write()[0];
  }
}
