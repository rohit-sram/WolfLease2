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
  title = 'MotelPro Visulization';
  loginForm : FormGroup;
  show: boolean = false;
  constructor(private spinner: NgxSpinnerService,private userInterface: UserInterfaceBehaviour,private fb : FormBuilder,private userService : SessionLoginService
    , private toast : ToastrService,private route : Router){

    this.loginForm = this.fb.group({
      userName : ['admin', Validators.required],
      password : ['admin', Validators.required]
    })
  }

  togglePassword(){
    this.show = !this.show;
  }
  async loginClicked(){
    // this.spinner.show();
    // let resp = await this.userService.loginUser(this.loginForm.get('userName')?.value,this.loginForm.get('password')?.value)
    // resp = resp['data']
    // if (resp['error']['cd']==241){
    //   this.spinner.hide();
    //   this.toast.error(resp['error']['txt'], resp['error']['hdr'], {
    //     timeOut: 3000,
    //   })
    // }
    // else if(resp['user']['authlvl'] != null && (resp['user']['authlvl']<=210 && resp['user']['authlvl'] >= 100)){
    //   this.spinner.hide();
    //   this.userInterface.addUser(resp['user'])
    //   this.toast.success('Welcome To the System', 'Login Successfull', {
    //     timeOut: 3000,
    //   })
    //   this.route.navigateByUrl("main")
    // }
    // else{
    //   this.spinner.hide();
    //   this.toast.error('Please try again!!', 'Invalid Credentials', {
    //     timeOut: 3000,
    //   })
    // }
    this.route.navigateByUrl("main")
  }


}
