import { Injectable } from '@angular/core';
import * as firebase from "firebase"

@Injectable()
export class FirebaseService {

  constructor() { 
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyA80FA_OFFdhaYEhVxjM0eNDBR6HGYdtB4",
      authDomain: "matchcards-7d5da.firebaseapp.com",
      databaseURL: "https://matchcards-7d5da.firebaseio.com",
      projectId: "matchcards-7d5da",
      storageBucket: "matchcards-7d5da.appspot.com",
      messagingSenderId: "193741764493"
    };
    firebase.initializeApp(config);
  }
  
  getPokemonCry(num: number = 1) {
    let ref = firebase.storage().ref(`pokemon cries/${num}.wav`);
    return ref.getDownloadURL();
  }
}
