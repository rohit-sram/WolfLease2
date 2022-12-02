import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import {appShellRoutes} from './app-shell.routes';
import { FlatModalComponent } from './containers/flat-modal/flat-modal.component';
import { FeatureService } from './services/feature.service';
import {defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RenderDataComponent } from './containers/render-data/render-data.compnent';
import { AddEditApartment } from './containers/add-edit-apartment/add-edit-apartment.component';
import { AddEditFlat } from './containers/add-edit-flat/add-edit-flat.component';
import { AddEditLease } from './containers/add-edit-lease/add-edit-lease.component';
import { AddEditOwner } from './containers/add-edit-owner/add-edit-owner.component';
import { AddEditUser } from './containers/add-edit-user/add-edit-user.component';
import { UserModalComponent } from './containers/user-modal/user-modal.component';
import { OwnerModalComponent } from './containers/owner-modal/owner-modal.component';
import { LeaseModalComponent } from './containers/lease-modal/lease-modal.component';
import { ApartmentModalComponent } from './containers/apartment-modal/apartment-modal.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path: '',component: AppShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(appShellRoutes),
  SimpleModalModule.forRoot({container: document.body}, {
    ...defaultSimpleModalOptions, ...{
      draggable: false,
      closeOnEscape: true,
      closeOnClickOutside: false
    }
  }),
  CommonModule],
  exports: [RouterModule],
  declarations: [
    AppShellComponent,
    HomePageComponent,
    FlatModalComponent,
    RenderDataComponent,
    AddEditApartment,
    AddEditFlat,
    AddEditLease,
    AddEditOwner,
    AddEditUser,
    UserModalComponent,
    OwnerModalComponent,
    LeaseModalComponent,
    ApartmentModalComponent
  ],
  providers: [
    FeatureService
  ]
})
export class AppShellModule { }
