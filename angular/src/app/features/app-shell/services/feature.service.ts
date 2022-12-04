import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appShellEndpoints } from '../app-shell.endpoints';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private readonly httpClient: HttpClient) { }

  getFeature(type: string): any{
    return this.httpClient.get<any>(appShellEndpoints.getPostSearchFeature(type),{
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    });
  }

  searchFeature(type: string,search: string): any{
    return this.httpClient.get<any>(appShellEndpoints.getPostSearchFeature(type), {
      params: {
        search
      },
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    });
  }

  deleteFeature(type: string,id: any){
    return this.httpClient.delete(appShellEndpoints.putDeleteFeature(type,id),{
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    });
  }

  putFeature(type: string,id: any, data: any){
    return this.httpClient.put<any>(appShellEndpoints.putDeleteFeature(type,id),data,{
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    });
  }

  postFeature(type: string, data: any){
    return this.httpClient.post<any>(appShellEndpoints.getPostSearchFeature(type),data,{
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    });
  }

  logout(){
    return this.httpClient.get<any>(appShellEndpoints.logout,{
      headers: {
        Authorization: 'Token '+localStorage.getItem('token')
      }
    })
  }
}
