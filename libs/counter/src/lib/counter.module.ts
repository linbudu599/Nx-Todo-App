import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCounter from './+state/counter/counter.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCounter.COUNTER_FEATURE_KEY,
      fromCounter.reducer
    ),
    EffectsModule.forFeature([]),
  ],
  providers: [],
})
export class CounterModule {}
