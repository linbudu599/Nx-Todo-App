import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { RouterComponent } from './router.component';
import { RouterAComponent } from './routerA.component';
import { RouterBComponent } from './routerB.component';
import { CarComponent } from './car/car.component';

@NgModule({
  declarations: [CarComponent],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [
    RouterComponent,
    RouterAComponent,
    RouterBComponent,
    CarComponent,
  ],
})
export class RouterUseModule {}
