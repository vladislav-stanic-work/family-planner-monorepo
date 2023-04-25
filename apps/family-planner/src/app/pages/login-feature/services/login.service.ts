import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  EROUTES,
  Error_Codes,
  IHttpResponse,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
  IUserRegisterResponse,
} from '@family-planner/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { AppService } from '../../../services/app.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private router: Router
  ) {}

  login({
    email,
    password,
  }: IUserLoginRequest): Observable<IUserLoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //   Authorization: 'my-auth-token'
      }),
    };

    return this.http
      .post<IHttpResponse<IUserLoginResponse>>(
        `${environment.API_URL}/users/login`,
        { email, password },
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IUserLoginResponse>) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate([`${EROUTES.DASHBOARD}`]);
          return data;
        }),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        }),
        finalize(() => {
          // Close loader
          console.log('final === ');
          return null;
        })
      );
  }

  register({ name, email, password }: IUserRegisterRequest): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<IHttpResponse<IUserRegisterResponse>>(
        `${environment.API_URL}/users`,
        { name, email, password },
        httpOptions
      )
      .pipe(
        map(() =>
          this.appService.showSnackbar(
            'Registration successfull. You can now login.'
          )
        ),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.error.errorCode]}`
          );
          return throwError(() => error);
        }),
        finalize(() => {
          // Close loader
          console.log('final === ');
          return null;
        })
      );
  }
}
