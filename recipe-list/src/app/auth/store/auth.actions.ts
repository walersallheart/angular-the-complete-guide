import { Action } from "@ngrx/store";

//Prefixing your event type names is encouraged to ensure uniqueness
//Action dispatches always hit ALL reducers, not jsut the one you're looking for
export const LOGIN_START = '[Auth] LOGIN START';
export const LOGIN_FAIL = '[Auth] LOGIN FAIL';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
    readonly type: string = LOGIN;
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

export class LoginFail implements Action {
    readonly type: string = LOGIN_FAIL;
    constructor(public payload:string){}
}

export type AuthActions =
    Login |
    Logout |
    LoginStart |
    LoginFail;