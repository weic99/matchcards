import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from "firebase";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FirebaseService {
  private url = 'https://matchcards-7d5da.firebaseio.com/api';
  private googleProvider: any;

  constructor(
    private http: Http
  ) {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyA80FA_OFFdhaYEhVxjM0eNDBR6HGYdtB4',
      authDomain: 'matchcards-7d5da.firebaseapp.com',
      databaseURL: 'https://matchcards-7d5da.firebaseio.com',
      projectId: 'matchcards-7d5da',
      storageBucket: 'matchcards-7d5da.appspot.com',
      messagingSenderId: '193741764493'
    };
    firebase.initializeApp(config);

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  getPokemonCry(num: number = 1) {
    let ref = firebase.storage().ref(`normalized cries/normalized-${num}.wav`);
    return ref.getDownloadURL();
  }

  getAllPokemons(): Promise<any> {
    return this.http.get(this.url + '/pokemon/.json')
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getPokemonImage(name: string = 'QuestionMark') {
    let ref = firebase.storage().ref(`pokemon-small-size/${name}.png`);
    return ref.getDownloadURL();
  }

  googleSignIn() {
    return firebase.auth().signInWithPopup(this.googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return user;
      }).catch(this.handleError);
  }


  private handleError(error: any) : Promise<any> {
    //console.log('Mongo error', error);
    return Promise.reject(error.message || error);
  }
}
