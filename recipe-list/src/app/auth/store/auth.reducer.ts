import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user:User
}

const initialState:State = {
    user:null
}

export function authReducer(state:State = initialState, action:AuthActions.AuthActions) {
    switch  (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationData
            );
            return {
                ...state,
                user:user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user:null
            };
    }

    return state;
}