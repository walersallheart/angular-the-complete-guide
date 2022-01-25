import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { map } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub!:Subscription;

    constructor(private dataStorageService:DataStorageService, private authService:AuthService, private store:Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
            .pipe(map(authData => authData.user))
            .subscribe(user => {
                this.isAuthenticated = !!user;
            });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}