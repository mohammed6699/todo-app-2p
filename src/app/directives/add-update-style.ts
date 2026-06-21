import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddUpdateStyle]',
})
export class AddUpdateStyle implements OnInit{
  constructor(
    private renderer: Renderer2,
    private pageStyle: ElementRef
  ) {}
  ngOnInit(): void {
          
    const tailWindCLasses = ['flex', 'flex-wrap', 'justify-center', 'w-auto', 'items-center', 'min-h-screen', 'bg-[linear-gradient(135deg,theme(colors.indigo.600),theme(colors.cyan.400))]']
    tailWindCLasses.forEach((className) => {
      this.renderer.addClass(this.pageStyle.nativeElement, className)
    })
  }
}
