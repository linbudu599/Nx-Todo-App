import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterAComponent } from './router/routerA.component';
import { RouterBComponent } from './router/routerB.component';

export const routes: Routes = [
  {
    path: '',
    component: RouterAComponent,
  },
  {
    path: 'a',
    component: RouterAComponent,
  },
  {
    path: 'a/:id',
    component: RouterAComponent,
  },
  {
    path: 'b',
    component: RouterBComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
