import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInterfaceBehaviour } from '../../interface/userInterfaceBehaviour/user-interface-behaviour';
import { SessionLoginService } from '../../service/sessionLogin/session-login.service';
import { NgxSpinnerService } from 'ngx-spinner'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Wolflease';
  loginForm : FormGroup;
  show: boolean = false;
  constructor(private spinner: NgxSpinnerService,private userInterface: UserInterfaceBehaviour,private fb : FormBuilder,private userService : SessionLoginService
    , private toast : ToastrService,private route : Router){

    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  togglePassword(){
    this.show = !this.show;
  }
  async loginClicked(){
    try {
      this.spinner.show();
      let { token } = await this.userService.loginUser(this.loginForm.value)
      const resp = await this.userService.getUser(token)
      this.userInterface.addUser({ token, ...resp })
      this.toast.success('Login Successful', 'Welcome to the system', { timeOut: 3000, })
      this.route.navigateByUrl("main")
    } catch (error) { 
      this.toast.error('Please try again!!', 'Invalid Credentials', { timeOut: 3000, })
    } finally { 
      this.spinner.hide();
    }
  }
}
