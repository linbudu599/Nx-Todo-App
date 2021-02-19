import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';

import { DCHostDirective } from '@todoapp/shared';

type DCData = {
  payload: number | string;
  component: Type<DynamicComponent>;
};

type DynamicComponent = {
  data: number | string;
};

@Component({
  template: ` <h4>NUMBER: {{ data }}</h4> `,
})
export class NumberDynamicComponent implements DynamicComponent {
  @Input() data: number;
}

@Component({
  template: ` <h4>STRING: {{ data }}</h4> `,
})
export class StringDynamicComponent implements DynamicComponent {
  @Input() data: string;
}

@Component({
  selector: 'todoapp-dynamic-comp',
  templateUrl: './dynamic-comp.component.html',
  styleUrls: ['./dynamic-comp.component.less'],
})
export class DynamicCompHostComponent implements OnInit, OnDestroy {
  @Input() datas: DCData[];

  currentAdIndex = -1;
  interval: number;

  @ViewChild(DCHostDirective, { static: true }) dcHost: DCHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComp();
    this.fetch();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  loadComp() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.datas.length;
    const item = this.datas[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      item.component
    );

    const viewContainerRef = this.dcHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DynamicComponent>(
      componentFactory
    );

    componentRef.instance.data = item.payload;
  }

  fetch() {
    this.interval = setInterval(() => {
      this.loadComp();
    }, 2000);
  }
}
