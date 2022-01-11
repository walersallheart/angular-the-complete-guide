import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers:[LoggingService]
})
export class NewAccountComponent {
  constructor(private loggingService:LoggingService, private accountService:AccountService) {
    this.accountService.statusUpdated.subscribe((status:string) => {
      alert('New Status: ' + status)
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    //loggingService is made automatically by Angular since its listed in the constructor arguments
    //and the class is provided under "providers".  If its not in the providers, it expects an instance of the
    //service from the parent component
    this.accountService.addAccount(accountName, accountStatus);
    //this.loggingService.logStatusChange(accountStatus);
  }
}
