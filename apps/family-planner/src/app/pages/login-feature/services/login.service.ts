import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry, finalize, map,  } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient){}

    login(email: string, password: string) {
        console.log('login with ', email, password);
        
        // const options = {
        //     // method: HttpMethods.POST,
        //     url: 'http://localhost:5001/api/users/login',
        //     email,
        //     password
        // };

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            //   Authorization: 'my-auth-token'
            })
        };

        console.log('this.httpClient === ', this.http)

        return this.http.post<any>('http://localhost:5001/api/users/login', {email, password}, httpOptions).pipe(
            map((response) => {
                console.log('response ==== ', response)
            // response
            return null;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('error ==== ', error)
            // error
            return throwError(() => error);
            }),
            finalize(() => {
                console.log('final === ')
                // finalize
                return null;
            })
        )
    };

    register(email: string, password: string) {
        console.log('register with ', email, password);
    };
  
}
