import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { EMAIL_VALIDATION } from '../../../constants';

@Component({
  selector: 'fpl-page-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_VALIDATION)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {}

  onSubmit() {
    this.loginService.register(this.registerForm.value.email as string, this.registerForm.value.password as string);
  }
}
