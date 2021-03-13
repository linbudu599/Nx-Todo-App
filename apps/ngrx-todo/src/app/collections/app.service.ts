import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateTodoDTO,
  UpdateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
  TodoType,
  TaggedTodoItem,
} from '@todoapp/dto';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { getRandomInt, TAGS } from '@todoapp/utils';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  todos: TodoItemBase[];

  constructor(private http: HttpClient) {}

  attachRandomTag(item: TodoItemBase): TaggedTodoItem {
    const randomTagTypeIdx = getRandomInt(1, 5);
    return {
      ...item,
      tag: TAGS[randomTagTypeIdx],
      tagText: TodoType[randomTagTypeIdx],
    };
  }

  fetchAll(): Observable<TaggedTodoItem[]> {
    return this.http.get<TodoItemBase[]>('/api/todos/all').pipe(
      // tap((_) => console.log(`fetchAll Data Length: ${_.length}`)),
      map((items) => items.map((item) => this.attachRandomTag(item))),
      tap((_) => console.log(`Tagged Item Data: ${_}`))
    );
  }

  fetchById(id: number): Observable<TodoItemBase> {
    return this.http
      .get<TodoItemBase>(`/api/todos/${id}`)
      .pipe(tap(() => console.log(`fetchById: ${id}`)));
  }

  createOne(createParams: CreateTodoDTO): Observable<TodoItemBase> {
    return this.http
      .post<TodoItemBase>('/api/todos/create', createParams)
      .pipe(
        tap(() => console.log(`createParams: ${JSON.stringify(createParams)}`))
      );
  }

  updateOne(updateParams: UpdateTodoDTO): Observable<TodoItemBase> {
    return this.http
      .post<TodoItemBase>('/api/todos/update', updateParams)
      .pipe(
        tap(() => console.log(`updateParams: ${JSON.stringify(updateParams)}`))
      );
  }

  deleteOne(deleteParams: DeleteTodoDTO): Observable<TodoItemBase> {
    return this.http
      .post<TodoItemBase>('/api/todos/delete', deleteParams)
      .pipe(
        tap(() => console.log(`deleteParams: ${JSON.stringify(deleteParams)}`))
      );
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
