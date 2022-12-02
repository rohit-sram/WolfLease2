import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { HomePageComponent } from './containers/home-page/home-page.component';

export const appShellRoutes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [{

      path: '',
      component: HomePageComponent

    }]
  }
 ];
