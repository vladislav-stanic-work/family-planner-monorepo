import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Error_Codes,
  IHttpResponse,
  IUser,
  IUserLoginRequest,
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
  constructor(private http: HttpClient, private appService: AppService) {}

  login({ email, password }: IUserLoginRequest): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //   Authorization: 'my-auth-token'
      }),
    };

    // Should return wrapper around Data
    // status, message,
    return this.http
      .post<IHttpResponse<IUser>>(
        `${environment.API_URL}/users/login`,
        { email, password },
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IUser>) => {
          localStorage.setItem('token', data.token);
          // Redirect to Dashboard
          this.appService.showSnackbar('SUCCESS!');
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
        // Authorization: 'Bearer'
      }),
    };

    // Should return wrapper around Data
    // status, message,
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
