import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filtroNameAsc = new EventEmitter();
  @Output() filtroNameDes = new EventEmitter();
  @Output() filtroCreationASC = new EventEmitter();
  @Output() filtroCreationDES = new EventEmitter();
  valName:string="";
  val:string="";

  constructor() { }

  ngOnInit(): void {
  }
  OnchangeAsc(){
   this.valName="name";
   this.filtroNameAsc.emit(this.valName)
  }
  OnchangeDes(){
    this.val="-name";
    this.filtroNameDes.emit(this.val)
   }
   OnchangeAscC(){
    this.val="modified";
    this.filtroCreationASC.emit(this.val)
   }
   OnchangeDesC(){
    this.val="-modified";
    this.filtroCreationDES.emit(this.val)
   }
}
