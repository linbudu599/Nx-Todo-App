import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  increment,
  decrement,
  reset,
  COUNTER_FEATURE_KEY,
} from '@todoapp/counter';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'NgRx Practice';

  count$: Observable<number>;

  constructor(private store: Store<{ [COUNTER_FEATURE_KEY]: number }>) {
    this.count$ = store.select(COUNTER_FEATURE_KEY);
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
