import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  title = "我的方案"

  selectTitle = "待开奖";
  data: any[] = [{
    value: 'huangjingao',
    label: '黄金糕',
  }, {
    value: 'shizitou',
    label: '狮子头',
  }, {
    value: 'luosifen',
    label: '螺蛳粉',
  }]

  constructor() { }

  ngOnInit() {
  }

  handle(index: string): void {
    console.log(index)
    this.selectTitle = index
  }

}
