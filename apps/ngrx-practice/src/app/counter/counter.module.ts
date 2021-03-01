import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { CounterModule as CounterStateModule } from '@todoapp/counter';

import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, CounterStateModule],
  providers: [],
  bootstrap: [CounterComponent],
})
export class CounterModule {}
