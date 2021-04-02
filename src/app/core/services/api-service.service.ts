import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  API_URL = environment.api_url;

  constructor(private http: HttpClient) { }

  get(url: string, paramsData?: any): Observable<any> {
    let params = this.getHttpParams(paramsData);
    return this.http.get(`${this.API_URL}/${url}`, { params });
  }

  post(url: string, data: any, paramsData?: any): Observable<any> {
    let params = this.getHttpParams(paramsData);
    return this.http.post(`${this.API_URL}/${url}`, data, { params });
  }

  put(url: string, data: any, paramsData?: any): Observable<any> {
    let params = this.getHttpParams(paramsData);
    return this.http.put(`${this.API_URL}/${url}`, data, { params });
  }

  patch(url: string, data: any, paramsData?: any): Observable<any> {
    let params = this.getHttpParams(paramsData);
    return this.http.patch(`${this.API_URL}/${url}`, data, { params });
  }

  delete(url: string, paramsData?: any): Observable<any> {
    let params = this.getHttpParams(paramsData);
    return this.http.delete(`${this.API_URL}/${url}`, { params });
  }

  private getHttpParams(paramsData?: any):HttpParams {
    let httpParams = new HttpParams();
    if (paramsData !== undefined) {
      Object.getOwnPropertyNames(paramsData).forEach(key => {
        httpParams = httpParams.set(key, paramsData[key]);
      });
    }

    return httpParams;
  }

}
