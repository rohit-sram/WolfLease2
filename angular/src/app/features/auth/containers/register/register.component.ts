import {Component, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {DOCUMENT, LocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'cim-login',
    templateUrl: './register.component.html'
  })
  export class RegisterComponent implements OnDestroy {
    registerForm: FormGroup;
  
    //to avoid memory leaks
    onDestroySubject: Subject<void> = new Subject<void>();
  
    constructor(
      private readonly formBuilder: FormBuilder,
     private readonly loginService: LoginService,
     private readonly router: Router
    ) {
      this.registerForm = this.formBuilder.group(
        {
          username: '',
          password: '',
          password2: '',
          email: '',
          first_name: '',
          last_name: '',
        },
        {
          validators: [Validators.required]
        }
      );
    }
  
    // todo: have to be discussed
    onSubmit(): void {
      if (this.registerForm.invalid && this.registerForm.value.password!=this.registerForm.value.password2) {
        return;
      }
  
      const username = this.registerForm.value.username;
      const password = this.registerForm.value.password;
      const password2 = this.registerForm.value.password2;
      const email = this.registerForm.value.email;
      const first_name = this.registerForm.value.first_name;
      const last_name = this.registerForm.value.last_name;

      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('password2', password2);
      formData.append('email', email);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);

      this.loginService.register(formData)
        .subscribe((resp: any) => {
        this.router.navigateByUrl('/login');
      })
      
    }
  
    ngOnDestroy() {
      this.onDestroySubject.next();
    }
  }