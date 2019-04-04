import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public title = "我的方案"
  public GameIddata: any[] = [{
    id: 0,
    label: '全部'
  }, {
    id: 407,
    label: '竞彩足球'
  }, {
    id: 406,
    label: '竞彩篮球'
  }];
  public winStatus: any = [{
    value: 0,
    label: "全部"
  }, {
    value: 1,
    lable: "未开奖"
  }, {
    value: 2,
    label: "未中奖"
  }, {
    value: 3,
    label: "已中奖"
  }];
  public planStatus: any = [{
    id: 0,
    label: "全部"
  }, {
    id: 1,
    lable: "待出票"
  }, {
    id: 2,
    label: "出票成功"
  }, {
    id: 3,
    label: "方案失败"
  }, {
    id: 5,
    label: "待接单"
  }];
  public tradeData: any = []
  public value = '全部彩种';
  public value2 = "中奖状态";
  public value3 = "方案状态";
  public pageNo: number = 1;
  public ps = 10;
  public realTimeQuery: boolean = true;
  public type: number = 0;
  public isDanguan: number = 0;
  public gameId:number = 0;
  public winStatusId:number = 0;
  public planStatusId:number = 0;

  constructor(private signService: SignService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    let data = {
      'winStatus': this.winStatusId,
      'gameId': this.gameId,
      'planStatus': this.planStatusId,
      'isDanguan': this.isDanguan,
      'pn': this.pageNo,
      'ps': this.ps,
      'type': this.type,
      'realTimeQuery': this.realTimeQuery
    }

    var that = this;
    this.http.get('/api/m/plan/queryAll.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response)
      that.doData(response)
    });
  }

  doData(res) {
    console.log(res)
    if(res.ro.code == '0000'){
      this.tradeData = res.resp
    }
  }

  checkGameId(e): void {
    this.gameId = e.id;
    if (e.id == 0) {
      this.value = "全部彩种"
    } else {
      this.value = e.label
    }
    this.getData()
  }

  checkWinStatus(e) {
    this.winStatusId = e.id;
    if (e.id == 0) {
      this.value2 = "中奖状态"
    } else {
      this.value2 = e.label;
    }

    this.getData()
  }

  checkPlanStatus(e) {
    this.planStatusId = e.id;
    if (e.id == 0) {
      this.value3 = "方案状态"
    } else {
      this.value3 = e.label;
    }
    this.getData()
  }

  teadeDetail() {
    this.router.navigate(['trade/tradedetail']);
  }

}
