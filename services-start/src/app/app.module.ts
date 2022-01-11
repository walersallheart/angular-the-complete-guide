import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountService } from './account.service';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  //Every component will get the same instance of the AccountService object (as long as its listed in its constructor)
  //unless its in the providers for that component, in which case it and its child components will recieve THAT instance
  providers: [AccountService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
