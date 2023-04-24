import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { EMAIL_VALIDATION } from '../../../constants';
import { ERoutes } from '../../../utils/enums';

@Component({
  selector: 'fpl-page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginComponent {
  ERoutes = ERoutes;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_VALIDATION)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private readonly fb: FormBuilder, 
    private readonly loginService: LoginService) {}

  onSubmit(): void {
    const {email, password} = this.loginForm.value;
    this.loginService.login({email: email || '', password: password || ''})
    .subscribe();
  }
}
