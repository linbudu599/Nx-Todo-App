import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCar } from './car.selectors';

@Component({
  selector: 'todoapp-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent {
  car$ = this.store.pipe(select(selectCar));

  constructor(private store: Store) {}
}
