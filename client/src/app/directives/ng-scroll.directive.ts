import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngScroll]'
})
export class NgScrollDirective {
  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let el = event.target;
    let limit = el.scrollHeight - el.clientHeight;

    if (event.target.scrollTop === limit) {
      console.log('end');
    }
  };

  constructor() { }
}
