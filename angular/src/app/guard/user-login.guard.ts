import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionLoginService } from '../service/sessionLogin/session-login.service';
import { ToastrService } from 'ngx-toastr';
import { UserInterfaceBehaviour } from '../interface/userInterfaceBehaviour/user-interface-behaviour';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor (private sessionLoginService: SessionLoginService, private toast: ToastrService, private route: Router, private userInterface: UserInterfaceBehaviour){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      // const userZToken = this.userInterface.getUser()['ztoken']
      // let response = await this.sessionLoginService.sessionStatusAPICall(userZToken)
      // response = response['data']
      // console.log(response)
      // if (response['session'] === 'true') {
      //   return Promise.resolve(true)
      // } else {
      //   this.toast.warning("Session Timed Out","Please login again",{ timeOut: 3000 })
      //   this.userInterface.addUser({})
      //   this.route.navigateByUrl('/')
      //   return Promise.resolve(false)
      // }
      return Promise.resolve(true)
  }

}
