import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  apiUrl: string;
  token: string;
  constructor (private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.token = localStorage.getItem('authToken');
  }

  getData () {
    return this.http.get(`${this.apiUrl}/boards`)
      .catch(this.errorHandler);
  }

  addBoard (board) {
    return this.http.post(`${this.apiUrl}/boards`, board)
      .catch(this.errorHandler);
  }

  signUp (data) {
    return this.http.post<any>('api/users/login', data)
      .map(response => {
        const token = response.token;
        this.token = token;
        localStorage.setItem('authToken', token);
        return response.data;
      })
      .catch(this.errorHandler);
  }

  signIn(data) {
    return this.http.get<any>('api/users/login', data)
      .map(response => {
        const token = response.token;
        this.token = token;
        localStorage.setItem('authToken', token);
        return response.data;
      })
      .catch(this.errorHandler);
  }

  errorHandler (error) {
    console.error(error);
    return Observable.throw(error);
  }
}
