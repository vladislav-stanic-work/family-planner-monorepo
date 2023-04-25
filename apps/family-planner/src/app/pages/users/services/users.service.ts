import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Error_Codes, IHttpResponse, IUser } from '@family-planner/utils';
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
}
