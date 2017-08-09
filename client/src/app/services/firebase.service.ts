import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from "firebase";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FirebaseService {
  private url = 'gs://matchcards-7d5da.appspot.com/pokemon cries';
  constructor(
    private http: Http
  ) { 
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
  
  getCry(num: number) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    storageRef.child(`pokemon cries/${num}.wav`).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
      console.log(url);
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

    }).catch(function(error) {
      // Handle any errors
    });
    
    // return this.http.get(this.url + `/${num}.wav`)
    //   .toPromise()
    //   .then(res => {
    //     console.log(res.json());
    //   })
    //   .catch(this.handleError);
  }
  
  private handleError(error: any) : Promise<any> {
    //console.log('Mongo error', error);
    return Promise.reject(error.message || error);
  }
}
