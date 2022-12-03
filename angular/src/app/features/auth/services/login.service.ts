import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(data: FormData): any{
    return this.httpClient.post<any>('http://localhost:8000/login/',data);
  }

  register(data: FormData): any{
    return this.httpClient.post<any>('http://localhost:8000/register/',data);
  }

}
