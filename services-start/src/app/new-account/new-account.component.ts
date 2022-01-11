import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers:[LoggingService, AccountService]
})
export class NewAccountComponent {
  constructor(private loggingService:LoggingService, private accountService:AccountService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    //loggingService is made automatically by Angular since its listed in the constructor arguments
    //and the class is provided under "providers"
    this.accountService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
