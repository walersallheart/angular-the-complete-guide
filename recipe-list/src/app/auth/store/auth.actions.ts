import { Action } from "@ngrx/store";

//Prefixing your event type names is encouraged to ensure uniqueness
//Action dispatches always hit ALL reducers, not jsut the one you're looking for
export const SIGNUP_START = '[Auth] SIGNUP START';
export const LOGIN_START = '[Auth] LOGIN START';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN FAIL';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class AuthenticateSuccess implements Action {
    readonly type: string = AUTHENTICATE_SUCCESS;
    constructor(public payload: { email:string, userId:string, token:string, expirationDate:Date }){}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    public payload:any = null;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload:{ email:string, password:string }){}
}

export class AuthenticateFail implements Action {
    readonly type: string = AUTHENTICATE_FAIL;
    constructor(public payload:string){}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload:{ email:string, password:string }){}
}

export type AuthActions =
    AuthenticateSuccess |
    Logout |
    LoginStart |
    AuthenticateFail |
    SignupStart;