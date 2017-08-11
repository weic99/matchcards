import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngScroll]'
})
export class NgScrollDirective {
  @Input('ngScroll') offset: number; /** % offset from the bottom */

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let el = event.target;
    let limit = (el.scrollHeight - el.clientHeight) * (100 - this.offset) / 100;

    /** reached the target percentage */
    if (limit <= event.target.scrollTop) {
      console.log('end');
    }
  };
  
  constructor() { }
}
