import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showLogin: boolean = false;
  
  constructor(
    private router : Router
  ) { }
  
  @HostListener('document:keypress') onKeyUp() {
    this.login();
  }
  
  @HostListener('document:click') onMouseClick() {
    this.login();
  }
  
  private login() {
    this.showLogin = true;
    // this.router.navigate(['/login']);
  }
  
  private submitLogin() {
    
  }
}
