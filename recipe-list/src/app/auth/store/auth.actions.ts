import { Action } from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: { email:string, userId:string, token:string, expirationData:Date }){}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    public payload:any = null;
}

export type AuthActions =
    Login |
    Logout;