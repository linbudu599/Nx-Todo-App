import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

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

@Directive({ selector: '[todoappUnless]' })
export class UnlessDirective {
  private hasView = false;

  // 不会被读取所以不用设置getter
  @Input() set todoappUnless(condition: boolean) {
    // 被设置为false 且当前未创建视图
    if (!condition && !this.hasView) {
      // 创建内嵌视图并插入到当前容器
      // 猜测应该是不会乱插 根据templateRef定义的位置插入
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      // 清除此容器
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private readonly templateRef: TemplateRef<HTMLElement>,
    // 指令附着组件的宿主
    private readonly viewContainer: ViewContainerRef
  ) {}
}
