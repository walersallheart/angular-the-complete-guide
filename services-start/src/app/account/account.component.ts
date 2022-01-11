import { Component, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[LoggingService, AccountService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService:LoggingService, private accountService:AccountService) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
    //console.log('A server status changed, new status: ' + status);
  }
}
