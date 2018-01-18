import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  apiUrl: string;
  token: string;
  private authSubject = new ReplaySubject<boolean>();
  authChange: Observable<boolean> = this.authSubject.asObservable();


  constructor (private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.token = localStorage.getItem('authToken');
    this.authSubject.next(!!this.token);
  }



  getBoards () {
    const headers = {};

    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.get(`${this.apiUrl}/boards`, { headers })
      .catch(this.errorHandler);
  }

  addBoard (board) {
    const headers = {};

    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.post(`${this.apiUrl}/boards`, board, { headers })
      .catch(this.errorHandler);
  }

  addTask (task, boardId) {
    const headers = {};

    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.post(`${this.apiUrl}/tasks`, { task, boardId }, { headers })
      .catch(this.errorHandler);
  }

  signUp (data) {
    return this.http.post<any>(`${this.apiUrl}/login/signup`, data)
      .map(response => {
        const token = response.token;
        this.token = token;
        localStorage.setItem('authToken', token);
        this.authSubject.next(true);
        return true;
      })
      .catch(this.errorHandler);
  }

  signIn(data) {
    return this.http.post<any>(`${this.apiUrl}/login/signin`, data)
      .map(response => {
        const token = response.token;
        this.token = token;
        localStorage.setItem('authToken', token);
        this.authSubject.next(true);
        return response.boards;
      })
      .catch(this.errorHandler);
  }

  logout () {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.post<any>(`${this.apiUrl}/login/logout`, null, { headers })
      .map(response => {
        localStorage.removeItem('authToken');
        this.authSubject.next(false);
        this.token = null;
        return true;
      })
      .catch(this.errorHandler);
  }

  editTask (task) {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.put<any>(`${this.apiUrl}/tasks`, task, { headers })
      .catch(this.errorHandler);
  }

  editBoard (data) {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.patch<any>(`${this.apiUrl}/boards`, data, { headers })
      .catch(this.errorHandler);
  }

  deleteBoard (id) {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.request('delete', `${this.apiUrl}/boards`, { headers, body: { id } })
      .catch(this.errorHandler);
  }

  deleteTask (data) {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.request('delete', `${this.apiUrl}/tasks`, { headers, body: data })
      .catch(this.errorHandler);
  }

  moveTask (data) {
    const headers = {};
    if (this.token) {
      headers['authorization'] = this.token;
    }

    return this.http.post<any>(`${this.apiUrl}/tasks/move`, data, { headers })
      .catch(this.errorHandler);
  }

  errorHandler (error) {
    console.error(error);
    return Observable.throw(error);
  }
}
