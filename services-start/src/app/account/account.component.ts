import { Component, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[LoggingService,]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService:LoggingService, private accountService:AccountService) {}

  onSetTo(status: string) {
    //accountService is made automatically by Angular since its listed in the constructor arguments
    //and the class is provided under "providers".  If its not in the providers, it expects an instance of the
    //service from the parent component
    this.accountService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
    //console.log('A server status changed, new status: ' + status);
  }
}
