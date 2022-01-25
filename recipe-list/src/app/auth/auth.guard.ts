import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router, private store:Store<fromApp.AppState>){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1), //makes sure we only pull this data one time, then automatically unsubscribe
            map(authState => {
                return authState.user;
            }),
            map(user => {
            const isAuth = !!user;

            if  (isAuth) {
                return true;
            }

            return this.router.createUrlTree(['/auth']);
        }));
    }

}