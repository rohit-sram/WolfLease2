import {Component, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
// import {LoginInfo} from '@features/auth/models/login-info';
import { LoginService } from '../../services/login.service';
import {DOCUMENT, LocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'cim-login',
    templateUrl: './login.component.html'
  })
  export class LoginComponent implements OnDestroy {
    loginForm: FormGroup;
  
    onDestroySubject: Subject<void> = new Subject<void>();
    message: string = 'Username or password is incorrect';
    isError: boolean = false;
  
    constructor(
      private readonly formBuilder: FormBuilder,
        private readonly loginService: LoginService,
        private readonly router: Router,
      private readonly locationStrategy: LocationStrategy
    ) {
      this.loginForm = this.formBuilder.group(
        {
          username: '',
          password: ''
        },
        {
          validators: [Validators.required]
        }
      );
    }
  
    // todo: have to be discussed
    onSubmit(): void {
      if (this.loginForm.invalid) {
        return;
      }
  
      this.isError = false;

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
   
      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      this.loginService.login(formData)
      .subscribe((resp: any) => {
        if(resp.message){
            localStorage.setItem('token',resp.token);
            this.router.navigateByUrl('/home');
        }}, (error: any) => {
            this.isError = true;
            this.router.navigateByUrl('/login');
        });
    }
  
    ngOnDestroy() {
      this.onDestroySubject.next();
    }
  }