import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardStyle]',
})
export class CardStyle implements OnInit{
  // elementRef sub for getElementBy(id, className, .............)
  constructor(
    private cardRef: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    const tailWindClasses = ['group','relative','backdrop-blur-xl', 'border', 'border-slate-700', 'rounded-3xl', 'shadow-lg', 'overflow-hidden']
    tailWindClasses.forEach(className => {
      this.renderer.addClass(this.cardRef.nativeElement, className)
    })
  }
}
