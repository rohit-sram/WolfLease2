import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import { SessionLoginService } from '../../service/sessionLogin/session-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';

function validatePassword(control: AbstractControl): ValidationErrors | null {
  if (control && control.get("password") && control.get("password2")) {
    const password = control.get("password")!.value;
    const password2 = control.get("password2")!.value;

    return (password2 !== password) ? { 'passwordError': true } : null;
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  title = 'Wolflease';
  signUpForm : FormGroup;
  show: boolean = false;
  constructor(private spinner: NgxSpinnerService,private userInterface: UserInterfaceBehaviour,private fb : FormBuilder,private userService : SessionLoginService
    , private toast : ToastrService,private route : Router){

    this.signUpForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
      password2 : ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    }, { validators: validatePassword });
  }


  togglePassword(){
    this.show = !this.show;
  }
  async signUpClicked(){
    try {
      this.spinner.show();
      let resp = await this.userService.registerUser(this.signUpForm.value)
      this.toast.success('Welcome To the System', 'Signup Successfull', {
        timeOut: 3000,
      })
      this.route.navigateByUrl("login")
    } catch (error) { 
      let err = error as AxiosError || { response: { data: {} } };
      let message = Object.values(err.response!.data!).join('\n');
      this.toast.error('Please try again!!', message, { timeOut: 3000, })
    } finally {
      this.spinner.hide();
    }
  }
}
