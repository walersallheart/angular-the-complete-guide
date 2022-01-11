import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  //@Input makes this property accessible outside this component
  @Input('srvElement') element:{ type:string, name:string, content:string };
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  //content child lets you grab an element from content being passed into this element
  @ContentChild('contentParagraph') paragraph:ElementRef;

  constructor() {
    console.log('constructor called');
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('header->',this.header);
    console.log('paragraph->',this.paragraph);
  }

  ngDoCheck(): void {
      console.log('ngDoCheck called');
  }

  ngAfterContentInit(): void {
      console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('header->',this.header);
    console.log('paragraph->',this.paragraph);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
      console.log('ngOnDestroy called');
  }

}
