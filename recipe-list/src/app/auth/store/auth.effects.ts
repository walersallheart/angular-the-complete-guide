import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects'
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { User } from '../user.model';

import * as AuthActions  from './auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn:number, email:string, userId:string, token:string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    console.log('handle authentication user->',user);

    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({
        email:email,
        userId:userId,
        token:token,
        expirationDate:expirationDate
    })
}

const handleError = (errorResponse) => {
    let errorMessage = "An error has occurred";

    if (!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
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

    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects{
    private apiKey: string = 'AIzaSyDiooHldQe9sWE645LBHrxrxnWLyt9_DjU';

    constructor(
        private actions$: Actions,
        private http:HttpClient,
        private router:Router
    ){}

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction:AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
                {
                    email:signupAction.payload.email,
                    password:signupAction.payload.password,
                    returnSecureToken:true
                }
            ).pipe(
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(error => {
                    return handleError(error);
                })
            )
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
                {
                    email:authData.payload.email,
                    password:authData.payload.password,
                    returnSecureToken:true
                }
            ).pipe(
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            )
        })
    );

    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(
        ofType(
            AuthActions.AUTHENTICATE_SUCCESS,
            AuthActions.LOGOUT
        ),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() =>{
            const userData: {
                email:string;
                id:string;
                _token:string;
                _tokenExpirationDate:string;
            } = JSON.parse(localStorage.getItem('userData')!);

            if (!userData) {
                return { type:'NOT_LOGGED_IN' };;
            }

            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            console.log('autoLogin userData->',userData);

            if (loadedUser.token){
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);

                return new AuthActions.AuthenticateSuccess({
                    email:loadedUser.email,
                    userId:loadedUser.id,
                    token: loadedUser.token,
                    expirationDate:new Date(userData._tokenExpirationDate)
                })

            }

            return { type:'NOT_LOGGED_IN' };
        })
    )

    @Effect({ dispatch:false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
        })
    )
}