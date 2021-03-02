import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { RouterComponent } from './router.component';
import { RouterAComponent } from './routerA.component';
import { RouterBComponent } from './routerB.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [RouterComponent, RouterAComponent, RouterBComponent],
})
export class RouterUseModule {}
