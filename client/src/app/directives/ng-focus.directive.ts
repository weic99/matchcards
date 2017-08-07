import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[ngFocus]'
})
export class NgFocusDirective {

  constructor(
    private el: ElementRef, 
    private renderer: Renderer
  ) { }
  
  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
  }
}
