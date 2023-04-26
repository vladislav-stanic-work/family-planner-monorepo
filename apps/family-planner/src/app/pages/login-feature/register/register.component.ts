import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EROUTES } from '@family-planner/utils';
import { tap } from 'rxjs';

import { EMAIL_VALIDATION } from '../../../constants';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'fpl-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_VALIDATION),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  EROUTES = EROUTES;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService
  ) {}

  onSubmit() {
    const { name, email, password } = this.registerForm.value;
    this.loginService
      .register({
        name: name || '',
        email: email || '',
        password: password || '',
      })
      .pipe(
        tap(() => {
          this.registerForm.reset();
        })
      )
      .subscribe();
  }
}
