import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private showLogin: boolean;
  private username: string;
  private password: string;
  private success: boolean;
  private msg: string;
  
  constructor(
    private router: Router,
    private mongo: MongoService
  ) { }
  
  ngOnInit() {
    this.showLogin = true;
    this.success = false;
  }
  
  @HostListener('document:keyup', ['$event']) 
  onKeyEvent(event: KeyboardEvent) {
    if (event && event.isTrusted && event.key === 'Escape') {
      this.msg = '';
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }
  
  private onLoginSubmit() {
    this.success = false;
    this.msg = '';
    const user = {
      username: this.username.trim(),
      password: this.password.trim()
    }
    
    this.mongo.login(user)
      .then(res => {
        if (!res.success) {
          this.success = false;
          this.msg = res.msg;
          setTimeout(() => {
            this.msg = '';
          }, 2000);
          return;
        } 
        this.success = true;
        this.msg = 'Logging in...';
        setTimeout(() => {
          this.success = false;
          this.msg = '';
        }, 2000);
        
        this.showLogin = false;
        this.router.navigate(['/matchcards']);
      })
      .catch(res => {
        this.msg = 'Something went wrong, try again.';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      });
  }
  
  private setMessage(str: string) {
    
  }


}
