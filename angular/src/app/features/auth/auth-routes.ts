import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    },
	{
		path: 'login',
		component: LoginComponent
	},
    {
    path: 'register',
    component: RegisterComponent
    }
];