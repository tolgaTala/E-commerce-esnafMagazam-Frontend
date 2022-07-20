import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.css']
})
export class HesabimComponent implements OnInit {

  profile=true
  address:boolean
  orders:boolean
  esnaf:boolean
  @Input() order:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  goProfile(){
    this.profile=true
    this.esnaf=false
    this.address=false
    this.orders=false
  }
  goAdress(){
    this.profile=false
    this.esnaf=false
    this.address=true
    this.orders=false
  }
  goOrders(){
    this.profile=false
    this.esnaf=false
    this.address=false
    this.orders=true
  }
  goesnaf(){
    this.profile=false
    this.address=false
    this.orders=false
    this.esnaf=true
  }
}