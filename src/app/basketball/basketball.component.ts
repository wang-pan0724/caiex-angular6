import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { SelectMatchListService } from '../services/select-match-list.service'

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {

  public navId: number = 0;
  public tabId: number = 0;
  public basketballList:any = [];
  public basketballList5:any = [];
  public basketballDetail:any = [];
  public showPop: boolean = false;
  // 弹出层数据
  public popData: any = []; 
  public clickTabId: number = 0;
  public navData = [
    {
      id:0,
      name:'胜负'
    },
    {
      id:1,
      name:'让分胜负'
    },
    {
      id:2,
      name:'混合过关'
    },
    {
      id:3,
      name:'大小分'
    },
    {
      id:4,
      name:'胜分差'
    },
  ];
  // 选择的竞彩比赛
  public selectMatchDataList: any = [];
  
  constructor(private _menusService: MenusService, private _selectMatchService: SelectMatchListService) { }

  ngOnInit() {
    this._menusService.getBassketballData().then(data => {
      console.log(data)
      this.basketballList = data.resp;
      for (var i = 0; i < this.basketballList.list.length; i++) {
        this.basketballList.list[i].expend = false;
        this.basketballList.list[i].selectSpMap = {1: false, 2: false};
        // this.basketballList.list[i].canSelect = [0, 0, 0, 0, 0];
        this.basketballList.list[i].selectedSpmapers = [];
      }
    })
  }

  selectThisItem(index, item) {
    console.log(this.basketballList)
    if (this.tabId == 0) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList);
    }

    if (this.tabId == 4) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList5);
    }
    console.log(this.selectMatchDataList)
  }

  selectContent(item, clickTabId) {
    this.popData = item;
    this.clickTabId = clickTabId;
    this.showPop = true;
  }

  // 给每个竞彩选项设置选择的状态
  // selectedSpMap(obj) {
  //   var arr = [];
  //   var newArr = [];
  //   for (var key in obj) {
  //     arr.push(key)
  //   }
  //   for (var i = 0; i < arr.length; i++) {
  //     newArr[arr[i]] = false;
  //   }
  //   // console.log(newArr)
  //   return newArr;
  // }

  // 查看详细数据
  goDetail(e, item) {
    var that = this;
    if (e.currentTarget.firstElementChild.className == "icon ion-ios-arrow-down") {
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-up"

      this._menusService.getBassketballDetail().then(data => {
        this.basketballDetail = data;
        console.log(data)
      });

      item.expend = true;

    } else {
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-down"
      item.expend = false;
    }
  }

  doList(){

  }

  // nav切换
  navChanged(navid){
    this.navId = navid;
    console.log('全部/单关'+navid);
  }

  // tab切换
  tabChanged(tabid){
    this.tabId = tabid;
    if(tabid==4){
      this._menusService.getBassketballData5().then(data => {
        console.log(data)
        this.basketballList5 = data.resp;
        for (var i = 0; i < this.basketballList5.list.length; i++) {
          this.basketballList5.list[i].expend = false;
          this.basketballList5.list[i].selectSpMap = {1: false, 2: false};
          // this.basketballList.list[i].canSelect = [0, 0, 0, 0, 0];
          this.basketballList5.list[i].selectedSpmapers = [];
        }
      })
    }
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
    // var list = this.tabId == 0 ? this.footballList : this.tabId == 1 ? this.footballList2 : this.tabId == 2 ? this.footballList3 : this.tabId == 3 ? this.footballList4 : this.footballList5;
    // this.selectMatchDataList = this._selectMatchService.setData(list);
  }

}
