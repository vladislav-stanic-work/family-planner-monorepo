import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { EMAIL_VALIDATION } from '../../../constants';
import { ERoutes } from '../../../utils/enums';

@Component({
  selector: 'fpl-page-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_VALIDATION)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  ERoutes = ERoutes;

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {}

  onSubmit() {
    const {name, email, password} = this.registerForm.value;
    this.loginService.register({name: name || '', email: email || '', password: password || ''})
    .subscribe();;
  }
}
