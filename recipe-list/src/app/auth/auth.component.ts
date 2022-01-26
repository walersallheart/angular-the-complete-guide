import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscriber, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error:any = null;
    @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

    private closeSub!:Subscription;

    constructor(
        private authService:AuthService,
        private router:Router,
        private componentFactoryResolver:ComponentFactoryResolver,
        private store:Store<fromApp.AppState>
    ) {}
    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        });
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            //authObs = this.authService.login(email, password);
            this.store.dispatch(
                new AuthActions.LoginStart({email: email, password:password})
            );
        } else {
            authObs = this.authService.signup(email, password)
        }

        // authObs.
        //     subscribe(
        //         responseData => {
        //             console.log(responseData);
        //             this.isLoading = false;
        //             this.router.navigate(['/recipes']);
        //         },
        //         errorMessage => {
        //             this.error = errorMessage;
        //             this.showErrorAlert(errorMessage);
        //             this.isLoading = false;
        //         }
        //     );

        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message:string){
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}