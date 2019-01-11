import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  public navId: number = 0;
  public tabId: number = 0;
  public id: number = 0;
  public listItem:number = 0;
  public dataList = {
    details:[
      {
        id:0,
        country1:'中国',
        countrynum1:'112',
        country2:'巴林',
        countrynum2:'133',
        score:[
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          },
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          }
        ]
      },
      {
        id:1,
        country1:'里尔',
        countrynum1:'112',
        country2:'巴林',
        countrynum2:'133',
        score:[
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          },
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          }
        ]
      },
      {
        id:2,
        country1:'中国',
        countrynum1:'112',
        country2:'韩国',
        countrynum2:'133',
        score:[
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          },
          {
            score1:"胜",
            score2:"胜",
            score3:"胜",
            scoreNum1:'1.85',
            scoreNum2:'1.85',
            scoreNum3:'1.85'
          }
        ]
      }
    ]
  };
  constructor() { }

  ngOnInit() {
    // this.dataList.details.forEach((res,i)=>{
    //   res.select = false;
    // })
  }

  selectThisItem(e){
    if(e.currentTarget.firstElementChild.checked == false){
      e.currentTarget.firstElementChild.checked = true;
      e.currentTarget.className = 'scoreSelect';
    }else{
      e.currentTarget.firstElementChild.checked = false;
      e.currentTarget.className = '';
    }
  }

  // 查看详细数据
  goDetail(e){
    var that = this;
    // console.log(e.currentTarget.firstElementChild.className);
    if(e.currentTarget.firstElementChild.className == "icon ion-ios-arrow-down"){
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-up"
      that.id = 1;
    }else{
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-down"
      that.id = 0;
    }
  }

  doList(id){
    if(this.listItem == id){
      this.listItem = -1;
    }else{
      this.listItem = id;
    }
  }

  // nav切换
  navChanged(navid){
    this.navId = navid;
    console.log('全部/单关'+navid);
  }

  // tab切换
  tabChanged(tabid){
    this.tabId = tabid;
  }
}
