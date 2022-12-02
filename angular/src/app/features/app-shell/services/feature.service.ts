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

  deleteFeature(type: string,id: any){
    return this.httpClient.delete(appShellEndpoints.putDeleteFeature(type,id));
  }

  putFeature(type: string,id: any, data: FormData){
    return this.httpClient.put<any>(appShellEndpoints.putDeleteFeature(type,id),{data});
  }

  postFeature(type: string,id: any, data: FormData){
    return this.httpClient.post<any>(appShellEndpoints.getPostSearchFeature(type),{data});
  }
}
