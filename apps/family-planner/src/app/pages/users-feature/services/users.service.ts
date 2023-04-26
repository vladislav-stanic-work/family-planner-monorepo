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
  IUserDetails,
  IUserUpdate,
} from '@family-planner/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AppService } from '../../../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private appService: AppService) {}

  getUsers(): Observable<IUser[]> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .get<IHttpResponse<IUser[]>>(`${environment.API_URL}/users`, httpOptions)
      .pipe(
        map(({ data }: IHttpResponse<IUser[]>) => data),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }

  getUser(id: string): Observable<IUserDetails> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .get<IHttpResponse<IUserDetails>>(
        `${environment.API_URL}/users/${id}`,
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IUserDetails>) => data),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }

  updateUser(
    id: string,
    { name, description }: IUserUpdate
  ): Observable<IUserDetails> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .patch<IHttpResponse<IUserDetails>>(
        `${environment.API_URL}/users/${id}`,
        { name, description },
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IUserDetails>) => {
          this.appService.showSnackbar('Update successful!');

          const thisUser: IUserDetails = JSON.parse(
            localStorage.getItem('user') || ''
          );

          const newUser = {
            ...thisUser,
            ...data,
          };

          localStorage.setItem('user', JSON.stringify(newUser));
          return data;
        }),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }
}
