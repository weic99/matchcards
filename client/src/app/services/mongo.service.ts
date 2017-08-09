import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MongoService {
  private url = 'http://127.0.0.1:3000/api';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'User': 'admin'
  })
  private authToken: any;
  private username: any;
  private user_id: any;
  
  constructor(
    private http: Http
  ) { }
  
  login(user): Promise<any> {
    return this.http.post(this.url + '/users/login', user, {headers: this.headers})
      .toPromise()
      .then(res => {
        let json = res.json();
        if (!json.success) {
          return json;
        }
        console.log('logged in');
        this.username = json.username;
        this.user_id = json.user_id;
        this.authToken = json.token;
        return json;
      })
      .catch(this.handleError)
      .catch(res => res.json());
  }
  
  getAllPokemons(): Promise<any> {
    return this.http.get(this.url + '/pokemon', {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json().pokemons
      })
      .catch(this.handleError);
  }
  
  private handleError(error: any) : Promise<any> {
    //console.log('Mongo error', error);
    return Promise.reject(error.message || error);
  }
}
