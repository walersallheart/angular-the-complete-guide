import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
    ]
})

export class AuthModule{

}