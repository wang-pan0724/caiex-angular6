import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service'

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.component.html',
  styleUrls: ['./trade-detail.component.css']
})
export class TradeDetailComponent implements OnInit {

  public title = "方案详情";
  public tradeDetailData: any = [];

  public option: any = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return params[0].name + '<br/>'
          + '￥' + params[0].value;
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisLine: { onZero: true },
        data: [],
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 100000,
          showMinLabel: true,
          showMaxLabel: true,
        },
        splitNumber: 1,
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          interval: 100000,
          showMinLabel: true,
          showMaxLabel: true,
        },
        splitNumber: 1,
        max: 0
      }
    ],
    series: [
      {
        type: 'line',
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: []
      }
    ]
  }
  constructor(private _menusService: MenusService) { }

  ngOnInit() {
    this._menusService.getTradeDetail().then(data => {
      console.log(data);
      debugger;
      this.tradeDetailData = data.resp;
      var inquiryList = data.resp.inquiryList;
      var createTimeArr: any = [];
      var planPriceArr: any = [];
      for (var i = inquiryList.length - 1; i > -1; i--) {
        createTimeArr.push(inquiryList[i].createTime);
        planPriceArr.push(inquiryList[i].planPrice);
      }
      createTimeArr[0] = '出票';
      createTimeArr[createTimeArr.length-1] = '当前';
      this.option.xAxis[0].data = createTimeArr;
      this.option.yAxis[0].max = data.resp.maxPrice;
      this.option.series[0].data = planPriceArr;
    })
  }

}
