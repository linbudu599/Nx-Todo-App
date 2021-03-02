import { Component, OnInit } from '@angular/core';
import { appInit } from './car/car.actions';
import { selectCars } from './car/car.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'todoapp-router-store',
  templateUrl: './router.component.html',
})
export class RouterComponent implements OnInit {
  cars$ = this.store.pipe(select(selectCars));

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      appInit({
        cars: [
          { id: '1', make: 'ford', model: 'mustang', year: '2005' },
          { id: '2', make: 'ford', model: 'mustang', year: '1987' },
          { id: '3', make: 'ford', model: 'mustang', year: '1976' },
        ],
      })
    );
  }
}
