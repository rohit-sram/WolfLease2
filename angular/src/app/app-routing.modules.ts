import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import { UserLoginGuard } from './guard/user-login.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login',loadChildren: ()=>LoginModule},
  {path: 'home',loadChildren: ()=>MainModule, canActivate : [UserLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
