import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  searchtext:string=''

  constructor() { }

  ngOnInit(): void {
  }

  Onchange($event:any){

     this.searchtext = $event && $event.target && $event.target.value || '';
    this.searchEvent.emit(this.searchtext);
  }

}
