import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'todoapp-router-a',
  templateUrl: './routerA.component.html',
})
export class RouterAComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    // ?a=1
    this.route.queryParams.subscribe((params) => {
      console.log('query params: ', params);
    });
    // :id
    this.route.params.subscribe((params) => {
      console.log('params: ', params);
    });
    this.route.paramMap.pipe(
      tap((paramMaps) => {
        console.log('paramMaps: ', paramMaps);
      })
    );
  }
}
