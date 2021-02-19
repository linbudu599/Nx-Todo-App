import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes.pipe';
import {
  TitleHighlightDirective,
  UnlessDirective,
} from './directives.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CapitalizePipe, TitleHighlightDirective, UnlessDirective],
  exports: [CapitalizePipe, TitleHighlightDirective, UnlessDirective],
})
export class SharedModule {}
