import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { EMAIL_VALIDATION } from '../../../constants';

@Component({
  selector: 'fpl-page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_VALIDATION)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {}

  onSubmit() {
    this.loginService.login(this.loginForm.value.email as string, this.loginForm.value.password as string).subscribe();
  }
}
