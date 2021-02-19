import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes.pipe';
import {
  TitleHighlightDirective,
  UnlessDirective,
  DCHostDirective,
} from './directives.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CapitalizePipe,
    TitleHighlightDirective,
    UnlessDirective,
    DCHostDirective,
  ],
  exports: [
    CapitalizePipe,
    TitleHighlightDirective,
    UnlessDirective,
    DCHostDirective,
  ],
})
export class SharedModule {}
