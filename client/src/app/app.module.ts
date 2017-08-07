import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';

import { NgFocusDirective } from './directives/ng-focus.directive';

import { MongoService } from './services/mongo.service';

import { MatchcardsboardComponent } from './components/matchcardsboard/matchcardsboard.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'matchcards', component: MatchcardsboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NgFocusDirective,
    MatchcardsboardComponent,
    LoginComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule
  ],
  providers: [MongoService, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }