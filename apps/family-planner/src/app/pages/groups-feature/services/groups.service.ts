import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Error_Codes,
  IGroup,
  IGroupDetails,
  IGroupList,
  IHttpResponse,
} from '@family-planner/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AppService } from '../../../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient, private appService: AppService) {}

  getGroups(): Observable<IGroupList[]> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .get<IHttpResponse<IGroupList[]>>(
        `${environment.API_URL}/groups`,
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IGroupList[]>) => data),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }

  createGroup(createDetails: IGroup): Observable<IGroupDetails> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .post<IHttpResponse<IGroupDetails>>(
        `${environment.API_URL}/groups`,
        createDetails,
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IGroupDetails>) => {
          this.appService.showSnackbar('Group was created successfully.');
          return data;
        }),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }

  getGroup(id: string): Observable<IGroupDetails> {
    const token = localStorage.getItem('user') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      }),
    };

    return this.http
      .get<IHttpResponse<IGroupDetails>>(
        `${environment.API_URL}/groups/${id}`,
        httpOptions
      )
      .pipe(
        map(({ data }: IHttpResponse<IGroupDetails>) => data),
        catchError(({ error }: HttpErrorResponse) => {
          this.appService.showSnackbar(
            `Error: ${Error_Codes[error.errorCode]}`
          );
          return throwError(() => error);
        })
      );
  }

  // updateUser(
  //   id: string,
  //   { name, description }: IUserUpdate
  // ): Observable<IUserDetails> {
  //   const token = localStorage.getItem('user') || '';

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${JSON.parse(token)?.token}`,
  //     }),
  //   };

  //   return this.http
  //     .patch<IHttpResponse<IUserDetails>>(
  //       `${environment.API_URL}/users/${id}`,
  //       { name, description },
  //       httpOptions
  //     )
  //     .pipe(
  //       map(({ data }: IHttpResponse<IUserDetails>) => {
  //         this.appService.showSnackbar('Update successful!');

  //         const thisUser: IUserDetails = JSON.parse(
  //           localStorage.getItem('user') || ''
  //         );

  //         const newUser = {
  //           ...thisUser,
  //           ...data,
  //         };

  //         localStorage.setItem('user', JSON.stringify(newUser));
  //         return data;
  //       }),
  //       catchError(({ error }: HttpErrorResponse) => {
  //         this.appService.showSnackbar(
  //           `Error: ${Error_Codes[error.errorCode]}`
  //         );
  //         return throwError(() => error);
  //       })
  //     );
  // }
}
