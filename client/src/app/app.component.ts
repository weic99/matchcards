import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showLogin: boolean = false;
  private username: string;
  private password: string;
  private error: string;
  
  constructor(
    private router : Router,
    private flashMessages: FlashMessagesService
  ) { }
  
  @HostListener('window:keydown', ['$event']) 
  onKeyEvent(event: KeyboardEvent) {
    if (event && event.isTrusted && event.key === 'Escape') {
      this.error = '';
      this.showLogin = false;
    } else {
      this.login();
    }
  }
  
  // @HostListener('window:click', ['$event']) 
  // onMouseClick() {
  //   this.login();
  // }
  
  private login() {
    this.showLogin = true;
    // this.router.navigate(['/login']);
  }
  
  private onLoginSubmit() {
    this.error = this.username + this.password;
    setTimeout(() => {
      this.error = '';
    }, 2000);
  }
}
