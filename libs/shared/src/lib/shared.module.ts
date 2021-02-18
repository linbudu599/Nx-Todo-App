import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes.pipe';
import { TitleHighlightDirective } from './directives.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CapitalizePipe, TitleHighlightDirective],
  exports: [CapitalizePipe, TitleHighlightDirective],
})
export class SharedModule {}
