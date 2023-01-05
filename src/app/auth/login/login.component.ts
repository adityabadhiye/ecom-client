import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AuthRepository } from '../state/auth.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginStatus$: Observable<any>

  constructor(private authService: AuthService, private authRepository: AuthRepository) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.loginStatus$ = this.authRepository.loginStatus$;
  }

  submit() {
    this.authService.login(this.loginForm.value);
  }
}
