import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {
  apiUrl: string;
  constructor (private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getData () {
    return this.http.get(this.apiUrl)
      .catch(this.errorHandler);
  }

  errorHandler (error) {
    console.log(error);
    return Observable.of(error);
  }
}
