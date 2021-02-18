import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[todoappHighlight]',
})
export class TitleHighlightDirective {
  @Input('todoappHighlight') highlightColor: string;
  @Input() inputDefaultColor: string;

  private readonly defaultHighlightColor = 'cadetblue';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.highlightColor);
    this.highlight(
      this.highlightColor ??
        this.inputDefaultColor ??
        this.defaultHighlightColor,
      'white'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.reset();
  }

  private highlight(bgColor: string, fontColor: string) {
    this.el.nativeElement.style.backgroundColor = bgColor;
    this.el.nativeElement.style.color = fontColor;
    this.el.nativeElement.style.borderRadius = '10px';
  }

  private reset() {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.color = null;
    this.el.nativeElement.style.borderRadius = null;
  }
}
