import { Injectable } from '@angular/core';
import axios  from 'axios'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionLoginService {

  constructor() {  }

  async loginUser(uid: any, pwd: any): Promise<any> {
    const config = {
      url: environment.url + "authuser?uid=" + uid + "&pwd=" + pwd,
      method: 'get'
    }
    return await axios(config)
  }
  async logout(ztoken: any): Promise<any> {
    const config = {
      url: environment.url + "authuser?ztoken=" + ztoken,
      method: 'delete'
    }
    return await axios(config)
  }
  async sessionStatusAPICall(ztoken: any): Promise<any> {
    const config = {
      url: environment.url + "authuser?ztoken=" + ztoken,
      method: 'get'
    }
    return await axios(config)
  }
}
