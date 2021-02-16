import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.appService.fetchAll().subscribe((x) => console.log(x));
  }
}
