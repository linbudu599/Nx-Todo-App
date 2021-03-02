import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterAComponent } from './router/routerA.component';
import { RouterBComponent } from './router/routerB.component';

import { CarComponent } from './router/car/car.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: RouterAComponent,
  // },
  // {
  //   path: 'a',
  //   component: RouterAComponent,
  // },
  // {
  //   path: 'a/:id',
  //   component: RouterAComponent,
  // },
  // {
  //   path: 'b',
  //   component: RouterBComponent,
  // },
  {
    path: ':carId',
    component: CarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
