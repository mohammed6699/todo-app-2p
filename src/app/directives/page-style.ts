import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPageStyle]',
})
export class PageStyle implements OnInit{
  constructor(
    private renderer: Renderer2,
    private pageRef: ElementRef
  ) {}
  ngOnInit(): void {
    const tailWindCLasses = ['min-h-screen', 'bg-[linear-gradient(135deg,theme(colors.indigo.600),theme(colors.cyan.400))]'];
    tailWindCLasses.forEach((className) => {
      this.renderer.addClass(this.pageRef.nativeElement, className)
    })
  }
}
