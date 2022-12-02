import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appShellEndpoints } from '../app-shell.endpoints';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private readonly httpClient: HttpClient) { }

  getFeature(type: string): any{
    return this.httpClient.get<any>(appShellEndpoints.getPostSearchFeature(type));
  }

  searchFeature(type: string,search: string): any{
    return this.httpClient.get<any>(appShellEndpoints.getPostSearchFeature(type), {
      params: {
        search
      }
    });
  }
}
