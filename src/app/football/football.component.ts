import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { SelectMatchListService } from '../services/select-match-list.service'

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  public navId: number = 0;
  public tabId: number = 0;
  public id: number = 0;
  public listItem: number = 0;
  public showPop: boolean = false;
  public clickTabId: number = 0;
  public navData = [
    {
      id: 0,
      name: '胜平负'
    },
    {
      id: 1,
      name: '混合过关'
    },
    {
      id: 2,
      name: '比分'
    },
    {
      id: 3,
      name: '总进球'
    },
    {
      id: 4,
      name: '半全场'
    },
  ];

  // 胜平负
  public footballList: any = [];
  // 混合过关
  public footballList2: any = [];
  // 比分
  public footballList3: any = [];
  // 总进球
  public footballList4: any = [];
  // 半全场
  public footballList5: any = [];
  // 比赛详情
  public footballDetail: any = [];
  // 弹出层数据
  public popData: any = [];
  // 选择的竞彩比赛
  public selectMatchDataList: any = [];

  constructor(private _menusService: MenusService,private _selectMatchService: SelectMatchListService) { }

  ngOnInit() {
    this._menusService.getFootballData().then(data => {
      this.footballList = data.resp;
      for (var i = 0; i < this.footballList.list.length; i++) {
        this.footballList.list[i].expend = false;
      }
      console.log(data.resp);
    });
  }

  selectThisItem(e,item,str) {
    this.selectMatchDataList =  this._selectMatchService.setData(e,item,str);
    console.log(this.selectMatchDataList)
    if(this.tabId == 1){
      var list = this.selectMatchDataList.list;
      for(var i=0; i<list.length; i++){
        var oBox = document.getElementById(list[i].matchNo);
        oBox.style.background = "#d0021b !important"
      }
    }
  }

  // 查看详细数据
  goDetail(e, item) {
    var that = this;
    if (e.currentTarget.firstElementChild.className == "icon ion-ios-arrow-down") {
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-up"

      this._menusService.getFootballDetail().then(data => {
        this.footballDetail = data.resp;
        // console.log(data.resp);
      });

      item.expend = true;

    } else {
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-down"
      item.expend = false;
    }
  }

  doList(id) {
    if (this.listItem == id) {
      this.listItem = -1;
    } else {
      this.listItem = id;
    }
  }

  // nav切换
  navChanged(navid) {
    this.navId = navid;
    console.log('全部/单关' + navid);
  }

  // tab切换
  tabChanged(tabid) {
    if (tabid == 1) {
      this._menusService.getFootballData2().then(data => {
        this.footballList2 = data.resp;
        for (var i = 0; i < this.footballList2.list.length; i++) {
          this.footballList2.list[i].expend = false;
        }
        console.log(data.resp);
      });
    }
    if (tabid == 2) {
      this._menusService.getFootballData3().then(data => {
        this.footballList3 = data.resp;
        for (var i = 0; i < this.footballList3.list.length; i++) {
          this.footballList3.list[i].expend = false;
        }
        console.log(data.resp);
      });
    }
    if (tabid == 3) {
      this._menusService.getFootballData4().then(data => {
        this.footballList4 = data.resp;
        for (var i = 0; i < this.footballList4.list.length; i++) {
          this.footballList4.list[i].expend = false;
        }
        console.log(data.resp);
      });
    }
    if (tabid == 4) {
      this._menusService.getFootballData5().then(data => {
        this.footballList5 = data.resp;
        for (var i = 0; i < this.footballList5.list.length; i++) {
          this.footballList5.list[i].expend = false;
        }
        console.log(data.resp);
      });
    }

    this.tabId = tabid;
  }

  selectContent(item,clickTabId) {
    this.popData = item;
    this.clickTabId = clickTabId;
    console.log(item);
    this.showPop = true;
  }

  // 取消按钮
  cancel() {
    this.popData = [];
    this.showPop = false;
  }

  // 确定按钮
  sure() {
    this.popData = [];
    this.showPop = false;
  }
}
