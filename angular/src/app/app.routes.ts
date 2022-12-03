import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: async() => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: async () => import('./features/app-shell/app-shell.module').then(m=> m.AppShellModule),
    canActivate: [AuthGuard]
  }
 ];
