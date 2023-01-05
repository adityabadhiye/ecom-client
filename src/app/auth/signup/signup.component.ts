import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    this.authService.signup(this.signupForm.value);
  }
}
