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
  public tradeDetailList:any = [];
  public tabIndex:number = 0;
  public navData:any = [
    {
      id:0,
      name:'方案交易'
    },
    {
      id:1,
      name: '方案明细'
    }
  ];
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
          showMinLabel: false,
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
        data: [],
        symbol:'none'
      }
    ],
    expend:true
  }
  constructor(private _menusService: MenusService) { }

  ngOnInit() {
    this._menusService.getTradeDetail().then(data => {
      console.log(data);
      this.tradeDetailData = data.resp;
      var inquiryList = data.resp.inquiryList;
      var createTimeArr: any = [];
      var planPriceArr: any = [];
      for (var i = inquiryList.length - 1; i > -1; i--) {
        createTimeArr.push(inquiryList[i].createTime);
        planPriceArr.push(inquiryList[i].planPrice);
      }
      createTimeArr[0] = createTimeArr[0] + '出票';
      createTimeArr[createTimeArr.length-1] = '当前';
      this.option.xAxis[0].data = createTimeArr;
      this.option.yAxis[0].max = data.resp.maxPrice;
      this.option.series[0].data = planPriceArr;
    })

    this._menusService.getTradeDetail2().then(data => {
      console.log(data);

      var dataList = data.resp;
      this.option.xAxis[0].data.unshift(data.resp.openTime);
      this.option.series[0].data.unshift(data.resp.orderAmount);
      if(data.resp.orderAmount>this.option.yAxis[0].max){
        this.option.yAxis[0].max = data.resp.orderAmount
      }
      dataList.lostPrice = (Number(dataList.orderAmount)-Number(dataList.planPrice.split(' ')[1])).toFixed(2);
      for(var i=0; i<dataList.contentList.length; i++){
        dataList.contentList[i].jsonContent = JSON.parse(data.resp.contentList[i].jsonContent);
        dataList.contentList[i].expend = true;
      }
      this.tradeDetailList = dataList;
      console.log(dataList)
    })
  }

  goDetail(e, item) {
    console.log(e)
    if (e.currentTarget.className == "iconfont icon-down iconDown") {
      e.currentTarget.className = "iconfont icon-up iconDown";
      item.expend = false;
    } else {
      e.currentTarget.className = "iconfont icon-down iconDown"
      item.expend = true;
    }
  }

   // 切换tab
   switchTab(index) {
    this.tabIndex = index;
  }

  handle(e){
    console.log(e)
  }

}
