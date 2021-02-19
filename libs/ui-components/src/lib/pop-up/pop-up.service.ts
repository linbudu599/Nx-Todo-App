import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopUpComponent } from './pop-up.component';

@Injectable()
export class PopUpService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  showAsComponent(message: string) {
    const popup = document.createElement('popup-component');

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      PopUpComponent
    );
    const popUpComponentRef = factory.create(this.injector, [], popup);

    this.applicationRef.attachView(popUpComponentRef.hostView);

    popUpComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popUpComponentRef.hostView);
    });

    popUpComponentRef.instance.message = message;

    document.body.appendChild(popup);
  }

  showAsElement(message: string) {
    const popupEl: NgElement &
      WithProperties<PopUpComponent> = document.createElement(
      'popup-element'
    ) as any;

    popupEl.addEventListener('closed', () =>
      document.body.removeChild(popupEl)
    );

    popupEl.message = message;

    document.body.appendChild(popupEl);
  }
}
