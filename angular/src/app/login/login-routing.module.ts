import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginGuard } from '../guard/user-login.guard';
import { MainModule } from '../main/main.module';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"main",loadChildren:()=>MainModule, canActivate : [UserLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
