import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import { SessionLoginService } from '../../service/sessionLogin/session-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';

function validatePassword(control: AbstractControl): ValidationErrors | null {
  if (control && control.get('password') && control.get('password2')) {
    const password = control.get('password')!.value;
    const password2 = control.get('password2')!.value;

    return password2 !== password ? { passwordError: true } : null;
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  title = 'Wolflease';
  signUpForm: FormGroup;
  show: boolean = false;
  passwordStrength: number = 0;
  passwordMessage: string = '';
  constructor(
    private spinner: NgxSpinnerService,
    private userInterface: UserInterfaceBehaviour,
    private fb: FormBuilder,
    private userService: SessionLoginService,
    private toast: ToastrService,
    private route: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        email: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
      },
      { validators: validatePassword }
    );

    this.signUpForm.get('password')?.valueChanges.subscribe((password) => {
      this.checkPasswordStrength(password);
    });
  }

  checkPasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20;

    this.passwordStrength = strength;

    if (strength <= 20) this.passwordMessage = 'Very Weak';
    else if (strength <= 40) this.passwordMessage = 'Weak';
    else if (strength <= 60) this.passwordMessage = 'Medium';
    else if (strength <= 80) this.passwordMessage = 'Strong';
    else this.passwordMessage = 'Very Strong';
  }

  togglePassword() {
    this.show = !this.show;
  }
  async signUpClicked() {
    try {
      this.spinner.show();
      let resp = await this.userService.registerUser(this.signUpForm.value);
      this.toast.success('Welcome To the System', 'Signup Successfull', {
        timeOut: 3000,
      });
      this.route.navigateByUrl('login');
    } catch (error) {
      let err = (error as AxiosError) || { response: { data: {} } };
      let message = Object.values(err.response!.data!).join('\n');
      this.toast.error('Please try again!!', message, { timeOut: 3000 });
    } finally {
      this.spinner.hide();
    }
  }
}
