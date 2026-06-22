import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appAddUpdateCardStyle]',
})
export class AddUpdateCardStyle implements OnInit{
  constructor(
    private renderer: Renderer2,
    private pageStyle: ElementRef
  ) {}
  ngOnInit(): void {
          
    const tailWindCLasses = ['mb-6', 'flex', 'flex-col', 'gap-6']
    tailWindCLasses.forEach((className) => {
      this.renderer.addClass(this.pageStyle.nativeElement, className)
    })
  }
}