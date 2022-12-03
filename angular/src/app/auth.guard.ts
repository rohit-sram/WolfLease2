import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private readonly router: Router,
              private readonly authService: AuthService){

  }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
