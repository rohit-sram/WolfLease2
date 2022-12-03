import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { authRoutes } from './auth-routes';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { LoginService } from './services/login.service';

@NgModule({
	declarations: [
	    LoginComponent,
        RegisterComponent
	],
	imports: [
		CommonModule, 
		RouterModule.forChild(authRoutes), 
		ReactiveFormsModule
	],
    providers: [
        LoginService,
    ]
})
export class AuthModule {}
