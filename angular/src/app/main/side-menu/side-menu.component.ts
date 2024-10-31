import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserInterfaceBehaviour } from '../../../app/interface/userInterfaceBehaviour/user-interface-behaviour';
import { SessionLoginService } from '../../../app/service/sessionLogin/session-login.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  name : string
  isVisible:boolean
  constructor(private spinner: NgxSpinnerService,private userInterace : UserInterfaceBehaviour,private router: Router, private userService : SessionLoginService,private toast : ToastrService) {
    this.name = this.userInterace.getUser()['fname'] + " " + this.userInterace.getUser()['lname']
    this.isVisible = this.userInterace.getUser()['authlvl'] > 200 ? true : false;
  }
  ngOnInit(): void {
  }
  async logout() {
    this.spinner.show();
    try {
      await this.userService.logout(this.userInterace.getUser()['ztoken'])
      this.spinner.hide()
      this.toast.success('Logout Successfully', 'Thanks for coming', {
        timeOut: 3000,
      })
      this.router.navigateByUrl('/')

    } catch (err) {
      console.log( err )
    } finally {
      this.spinner.hide()
      this.toast.success('Logout Successfully', 'Thanks for coming', {
        timeOut: 3000,
      })
      this.router.navigateByUrl('/')
    }

  }
  check = (event: Event) => {
    if (true) {
      event.preventDefault();
    }
  }
}
