import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  //@Output allows you to listen for these events externally
  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName:string, serverContent:string}>();

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit({
      serverName:this.newServerName,
      serverContent:this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName:this.newServerName,
      serverContent:this.newServerContent
    });
  }
}
