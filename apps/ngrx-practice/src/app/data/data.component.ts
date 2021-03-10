import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from './core';
import { HeroService } from './service';

@Component({
  selector: 'todoapp-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
})
export class DataComponent implements OnInit {
  loading$: Observable<boolean>;
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.entities$;
    this.loading$ = heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(hero: Hero) {
    this.heroService.add(hero);
  }

  delete(hero: Hero) {
    this.heroService.delete(hero.id);
  }

  getHeroes() {
    setTimeout(() => {
      this.heroService.getAll();
    }, 3000);
  }

  update(hero: Hero) {
    this.heroService.update(hero);
  }
}
