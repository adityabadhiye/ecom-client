import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes)
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
