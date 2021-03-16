import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { TodoNgRxStoreComponent } from '../store/app.component';
import { TodoNgRxEntityComponent } from '../collections/app.component';

const routes: Routes = [
  {
    path: 'store',
    component: TodoNgRxStoreComponent,
  },
  {
    path: 'entity',
    component: TodoNgRxEntityComponent,
  },
  {
    path: '',
    redirectTo: '/store',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
