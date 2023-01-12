import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AuthRepository } from '../state/auth.repository';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  signupStatus$: Observable<any>

  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository
  ) {
    this.signupForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.signupStatus$ = this.authRepository.signupStatus$;
    // this.signupStatus$.subscribe(console.log);
  }

  submit() {
    this.authService.signup(this.signupForm.value);
  }
}
