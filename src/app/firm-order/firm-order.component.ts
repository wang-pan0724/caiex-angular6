import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent implements OnInit {

  constructor() { }

  public title: string = "确认订单"

  ngOnInit() {
  }

}
