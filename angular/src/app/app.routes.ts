import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: async () => import('./features/app-shell/app-shell.module').then(m=> m.AppShellModule)
  }
 ];
