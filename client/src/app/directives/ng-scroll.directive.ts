import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngScroll]'
})
export class NgScrollDirective {
  @Input('ngScroll') offset: number; /** offset px from the bottom */

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let el = event.target;
    let limit = (el.scrollHeight - el.clientHeight)  - this.offset;//* (100 - this.offset) / 100;

    /** reached the target percentage */
    if (limit <= event.target.scrollTop) {
      document.getElementById('scroll').style.display = 'none'; /** hide the scroll indicators */
      document.getElementById('scroll2').style.display = 'none';
    } else {
      document.getElementById('scroll').style.display = 'inline'; /** show the scroll indicators */
      document.getElementById('scroll2').style.display = 'inline';
    }
  };

  constructor() { }
}
