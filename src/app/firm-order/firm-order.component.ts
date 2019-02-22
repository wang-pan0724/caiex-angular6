import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent implements OnInit {

  public title: string = "确认订单";
  public multiples: any = 1;
  public firmOrder: any = [];

  constructor(private router: Router) {
  }



  ngOnInit() {
    this.firmOrder = JSON.parse(localStorage.getItem('firmOrder'));
    console.log(this.firmOrder);
  }

  changeMuitples(e) {
    // value=value.replace(/[^0-9]/g, '')
    console.log(e)
    this.multiples = this.multiples.replace(/[^\d]/g, '');
  }

  sub() {
    if(this.multiples ==0){
      alert("最小倍数为1倍");
    }
    if (this.multiples > 1) {
      this.multiples--;
    } else {
      this.multiples = 0
    }
  }

  add() {
    if (this.multiples < 10000) {
      this.multiples++;
    } else {
      alert("最大倍数为10000倍")
    }
  }

}
