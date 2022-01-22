import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Subject, throwError, tap, BehaviorSubject} from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {
    private apiKey: string = 'AIzaSyDiooHldQe9sWE645LBHrxrxnWLyt9_DjU';
    user = new BehaviorSubject<User>(null!);


    constructor(private http:HttpClient) {}

    signup(email:string, password:string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email:string, password:string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
                        email,
                        userId,
                        token,
                        expirationDate
                    );

        this.user.next(user);
    }

    private handleError(errorResponse:HttpErrorResponse) {
        let errorMessage = "An error has occurred";

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found';
                break;
        }

        return throwError(errorMessage);
    }
}