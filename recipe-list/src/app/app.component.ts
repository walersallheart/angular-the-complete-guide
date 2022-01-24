import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './auth/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-list';
  loadedFeature = 'recipe';

  constructor(private authService:AuthService, private loggingService:LoggingService){}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('hello from AppComponent ngOnInit');
  }
}
