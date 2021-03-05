import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';

export interface Movie {
  id: string;
  name: string;
}

export interface MoviesState {
  movies: Movie[];
  userPreferredMoviesIds?: string[];
  moviesPerPage?: number;
  currentPageIndex?: number;
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  readonly movies$: Observable<Movie[]> = this.select((state) => state.movies);

  readonly userPreferredMovieIds$ = this.select(
    (state) => state.userPreferredMoviesIds
  );

  readonly moviesPerPage$ = this.select((state) => state.moviesPerPage);

  readonly currentPageIndex$ = this.select((state) => state.currentPageIndex);

  constructor(
    private store: Store<{
      counter: number;
    }>
  ) {
    super({
      movies: [],
      userPreferredMoviesIds: [],
      moviesPerPage: 10,
      currentPageIndex: 0,
    });

    // 使用全局store的数据
    this.store.select('counter').subscribe((count) => {
      console.log('component store :' + count);
    });

    // this.effect(cb)(deps)
    // 在节流的选择器发生变化时才会触发的副作用
    // this.effect(
    //   (
    //     moviePageData$: Observable<{
    //       moviesPerPage: number;
    //       currentPageIndex: number;
    //     }>
    //   ) => {
    //     return moviePageData$.pipe(
    //       concatMap(({ moviesPerPage, currentPageIndex }) =>
    //         this.movieService.loadMovies(moviesPerPage, currentPageIndex)
    //       ).pipe(tap((results) => this.updateMovieResults(results)))
    //     );
    //   }
    // )(this.fetchMoviesData$); // 👈 effect is triggered whenever debounced data is changed
  }

  // this.movieStore.addMovie(movie)
  readonly addMovie = this.updater((state, movie: Movie) => ({
    ...state,
    movies: [...state.movies, movie],
  }));

  readonly updateMoviesPerPage = this.updater(
    (state, moviesPerPage: number) => ({
      ...state,
      moviesPerPage, // updates with new value
    })
  );

  readonly updateCurrentPageIndex = this.updater(
    (state, currentPageIndex: number) => ({
      ...state,
      currentPageIndex, // updates with new page index
    })
  );

  readonly userPreferredMovies$ = this.select(
    this.movies$,
    this.userPreferredMovieIds$,
    (movies, ids) => movies.filter((movie) => ids.includes(movie.id))
  );

  // 标记为防抖选择器 会在状态变化完成之后才去筛选数据
  private readonly fetchMoviesData$ = this.select(
    this.moviesPerPage$,
    this.currentPageIndex$,
    (moviesPerPage, currentPageIndex) => ({ moviesPerPage, currentPageIndex }),
    { debounce: true } // 👈 setting this selector to debounce
  );

  // 每次调用会将id推入movieId流中
  // 内部进行竞态处理
  readonly getMovie = this.effect((movieId$: Observable<string>) => {
    return movieId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(
        (id) => id
        // this.moviesService.fetchMovie(id).pipe(
        //   //👇 Act on the result within inner pipe.
        //   tap({
        //     next: (movie) => this.addMovie(movie),
        //     error: (e) => this.logError(e),
        //   }),
        //   // 👇 Handle potential error within inner pipe.
        //   catchError(() => EMPTY)
        // )
      )
    );
  });
}
