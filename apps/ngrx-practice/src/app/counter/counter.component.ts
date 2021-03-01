import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { increment, decrement, reset } from '@todoapp/counter';

@Component({
  selector: 'todoapp-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less'],
})
export class CounterComponent {
  count$: Observable<number>;
  title = 'Counter Demo';

  constructor(
    private store: Store<{
      counter: number;
    }>
  ) {
    this.count$ = store.select('counter');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
