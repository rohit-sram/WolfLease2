import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { UserLoginGuard } from '../guard/user-login.guard';
const routes: Routes = [
  {path:"",component :MainComponent, children:[
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [UserLoginGuard]
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
