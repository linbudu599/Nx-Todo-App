import { Component, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

import { Movie, MoviesStore } from './movie.store';

@Component({
  selector: 'todoapp-component-store',
  template: `
    <li *ngFor="let movie of movies$ | async">
      {{ movie.name }}
    </li>
    <button (click)="flush()">Flush</button>
    <button (click)="fillData()">Fill</button>
  `,
  providers: [ComponentStore],
})
export class ComponentStoreComponent implements OnInit {
  // readonly movies$ = this.componentStore.state$.pipe(
  //   map((state) => state.movies)
  // );
  movies$ = this.moviesStore.movies$;

  constructor(
    private readonly componentStore: ComponentStore<{ movies: Movie[] }>,
    private readonly moviesStore: MoviesStore
  ) {}

  fillData() {
    this.moviesStore.setState({
      movies: [
        { id: '1', name: '环太平洋' },
        { id: '2', name: '寄生虫' },
      ],
    });
    // 部分更新, 必须在store已初始化后才能调用
    // this.moviesStore.patchState({
    //   movies: [
    //     { id: '1', name: '环太平洋' },
    //     { id: '2', name: '寄生虫' },
    //   ],
    // });
  }

  ngOnInit() {
    // 懒初始化
    this.fillData();
  }

  flush() {
    this.moviesStore.setState({ movies: [] });
  }
}
