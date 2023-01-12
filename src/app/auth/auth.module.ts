import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './service/auth-guard.service';
import { NgProgressModule } from 'ngx-progressbar';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: "red"
    }),
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
