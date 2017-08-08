import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MongoService } from '../../services/mongo.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private showLogin: boolean;
  private username: string;
  private password: string;
  private success: boolean;
  private msg: string;
  
  private clientId: string = '635789367848-nnifc2f55jo22pr1c9m098h9htlm1v96.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');
  
  private auth2: any;
  private googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(document.getElementById('googleBtn'));
    });
  }
  
  private attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        
      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
    });
  }
 
  constructor(
    private router: Router,
    private mongo: MongoService
  ) { }
  
  ngOnInit() {
    this.showLogin = true;
    this.success = false;
  }
  
  ngAfterViewInit() {
    this.googleInit();
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
          this.setMessage(res.msg);
          return;
        } 
        this.success = true;
        this.setMessage('Logging in...');
        this.showLogin = false;
        this.router.navigate(['/matchcards']);
      })
      .catch(res => {
        this.setMessage('Something went wrong, try again.');
      });
  }
  
  private setMessage(str: string) {
    this.msg = str;
    setTimeout(() => {
      this.success = false;
      this.msg = '';
    }, 2000);
  }
}
