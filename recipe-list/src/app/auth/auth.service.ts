import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError, tap, BehaviorSubject} from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.actions';

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
    private tokenExpirationTimer:any;

    constructor(
                private http:HttpClient,
                private router:Router,
                private store:Store<fromApp.AppState>
            ) {}

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

    autoLogin(){
        const userData: {
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token){
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            //this.user.next(loadedUser);
            this.store.dispatch(
                new fromAuth.Login({
                    email:loadedUser.email,
                    userId:loadedUser.id,
                    token: loadedUser.token,
                    expirationDate:new Date(userData._tokenExpirationDate)
                })
            );
        }
    }

    logout(){
        localStorage.removeItem('userData')
        //this.user.next(null!);

        this.store.dispatch(new fromAuth.Logout());

        this.router.navigate(['/auth']);

        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
                        email,
                        userId,
                        token,
                        expirationDate
                    );

        //this.user.next(user);

        this.store.dispatch(
            new fromAuth.Login({
                email:email,
                userId:userId,
                token: token,
                expirationDate:new Date(expiresIn)
            })
        );

        this.autoLogout(expiresIn *  1000);
        localStorage.setItem('userData', JSON.stringify(user));
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