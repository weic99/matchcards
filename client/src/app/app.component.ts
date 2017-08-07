import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MongoService } from './services/mongo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showLogin: boolean = false;
  private username: string;
  private password: string;
  private msg: string;
  
  constructor(
    private router: Router,
    private mongo: MongoService
  ) { }
  
  @HostListener('window:keydown', ['$event']) 
  onKeyEvent(event: KeyboardEvent) {
    if (event && event.isTrusted && event.key === 'Escape') {
      this.msg = '';
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }
  
  private login() {
    // this.router.navigate(['/login']);
  }
  
  private onLoginSubmit() {
    this.msg = '';
    const user = {
      username: this.username.trim(),
      password: this.password.trim()
    }
    
    this.mongo.login(user)
      .then(res => {
        if (!res.success) {
          this.msg = res.msg;
          setTimeout(() => {
            this.msg = '';
          }, 2000);
          return;
        } 
        this.msg = 'Logging in...';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      })
      .catch(res => {
        this.msg = 'Something went wrong, try again.';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      });
  }
}
