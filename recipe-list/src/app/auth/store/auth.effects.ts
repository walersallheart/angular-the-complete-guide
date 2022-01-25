import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects'
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as AuthActions  from './auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class AuthEffects{
    private apiKey: string = 'AIzaSyDiooHldQe9sWE645LBHrxrxnWLyt9_DjU';

    constructor(private actions$: Actions, private http:HttpClient){}

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
            ).pipe(catchError(error =>{
                of()
            }), map(resData => {
                of()
            }))
        })
    );
}