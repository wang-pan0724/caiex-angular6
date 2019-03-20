import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service'
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public title = "我的方案"
  public data: any[] = [{
    value: 'huangjingao',
    label: '全部'
  }, {
    value: 'shizitou',
    label: '竞彩足球'
  }, {
    value: 'luosifen',
    label: '竞彩篮球'
  }]
  public tradeData:any = []
  public value = '全部彩种'

  constructor(private MenusService: MenusService,private router: Router) { }

  ngOnInit() {
    this.MenusService.getTrade().then(data=>{
      console.log(data)
      this.tradeData = data.resp
    })
  }

  handle(index: any): void {
    console.log(index)
    this.value = index.label
  }

  teadeDetail(){
    this.router.navigate(['trade/tradedetail']);
  }

}
