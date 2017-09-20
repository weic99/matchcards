import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public redirected = true;

  constructor(
    private router: Router
  ) { }

  private login(e) {
    // console.log(e);
    if (/^[a-zA-Z\s]+$/.test(e.key)) {
      this.redirected = false;
      this.router.navigate(['/login']);
    }
  }
}
