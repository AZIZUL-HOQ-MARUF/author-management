import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  headers = { headers: new HttpHeaders() };

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url, this.headers);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.headers);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.headers);
  }

  patch(url: string, data: any): Observable<any> {
    return this.http.patch(url, data, this.headers);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, this.headers);
  }

}
