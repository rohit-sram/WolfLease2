import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginGuard } from '../guard/user-login.guard';
import { MainModule } from '../main/main.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"",component:LoginComponent},
  {path:"main",loadChildren:()=>MainModule, canActivate : [UserLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
