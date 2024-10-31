import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OwnersComponent } from './owners/owners.component';
import { UsersComponent } from './users/users.component';
import { LeaseComponent } from './lease/lease.component';
import { FlatsComponent } from './flats/flats.component';
import { ApartmentsComponent } from './apartments/apartments.component';
const routes: Routes = [
  {path:"",component :MainComponent, children:[
    {
      path: 'owners',
      component: OwnersComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'lease',
      component: LeaseComponent,
    },
    {
      path: 'flats',
      component: FlatsComponent,
    },
    {
      path: 'apartments',
      component: ApartmentsComponent,
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
