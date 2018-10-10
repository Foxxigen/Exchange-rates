import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: Http) {

  }

  public latest() {
    return this.http
      .get(url + 'latest')
      .pipe(map(res => res.json()))
  }

  public getData(date: string, base: string) {
    return this.http
      .get(url + date + '?base=' + base)
      .pipe(map(res => res.json()))
  }

}
