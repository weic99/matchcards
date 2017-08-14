import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showLogin: boolean;
  public success: boolean;
  public msg: string;

  private username: string;
  private password: string;

  private loginSuccessRoute: string;

  constructor(
    private router: Router,
    private zone: NgZone,
    private firebase: FirebaseService,
    private mongo: MongoService
  ) {
    this.loginSuccessRoute = '/selectgamemode';
  }

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

  private googleSignIn() {
    this.firebase.googleSignIn()
      .then(success => {
        this.zone.run(() => this.goToRoute(this.loginSuccessRoute));
      });
  }

  private onLoginSubmit() {
    this.success = false;
    this.msg = '';
    const user = {
      username: this.username.trim(),
      password: this.password.trim()
    }

    /** for demo purposes */
    if (user.username === 'demo' && user.password === 'demo') {
      this.goToRoute(this.loginSuccessRoute);
      return;
    }

    this.mongo.login(user)
      .then(res => {
        if (!res.success) {
          this.success = false;
          this.setMessage('Wrong username/password');
          return;
        }

        this.goToRoute(this.loginSuccessRoute);
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

  private goToRoute(str: string) {
    this.success = true;
    this.setMessage('Logging in...');
    this.showLogin = false;
    setTimeout(() => {
      this.router.navigate([str]);
    }, 1000);
  }
}
