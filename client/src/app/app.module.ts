import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NgFocusDirective } from './directives/ng-focus.directive';

import { MongoService } from './services/mongo.service';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NgFocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule
  ],
  providers: [MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
