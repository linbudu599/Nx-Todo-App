import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateTodoDTO, DeleteTodoDTO, UpdateTodoDTO } from '@todoapp/dto';
import { TodoFormComponent, SubmitEvt } from '@todoapp/ui-components';

import { AppService } from './app.service';

@Component({
  selector: 'todoapp-ngrx-entity',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class TodoNgRxEntityComponent implements OnInit {
  title = '@ngrx/entity todo';

  ngOnInit(): void {
    console.log('Init');
  }
}
