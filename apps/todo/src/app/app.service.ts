import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateTodoDTO,
  UpdateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
} from '@todoapp/dto';
import { Observable, of } from 'rxjs';
import { catchError, tap, pluck, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  todos: TodoItemBase[];

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<TodoItemBase[]> {
    return this.http.get<TodoItemBase[]>('/api/todos/all').pipe(
      tap((_) => console.log(`fetchAll Data Length: ${_.length}`)),
      catchError(this.handleError<TodoItemBase[]>('fetchAll', []))
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
