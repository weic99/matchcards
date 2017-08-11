import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngFocus]'
})
export class NgFocusDirective {

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
