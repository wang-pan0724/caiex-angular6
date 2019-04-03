import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { SelectMatchListService } from '../services/select-match-list.service';

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {

  public navId: number = 0;
  public tabId: number = 0;
  public basketballList:any = [];
  public basketballList3:any = [];
  public basketballList5:any = [];
  public basketballDetail:any = [];
  public showPop: boolean = false;
   // 显示提示信息
   public showTips:boolean = false; 
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

    if (this.tabId == 2) { 
      this.canSelectFun(this.basketballList3, index, item)
    }

    if (this.tabId == 4) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList5);
    }
    console.log(this.selectMatchDataList)
  }

  selectContent(item, clickTabId) {
    this.popData = item;
    console.log(item)
    this.clickTabId = clickTabId;
    this.showPop = true;
  }

  canSelectFun(dataList, index, item) {
    // var tmpArray = new Array();
    for (var i = 0; i < dataList.list.length; i++) {
      // var arr = [];
      // tmpArray.push([[], [], [], [], []]);
      var selectNum = 0
      for (var key in dataList.list[i].selectSpMap) {
        if (dataList.list[i].selectSpMap[key] == true) {
          selectNum++;
          if (key=='21' || key == '22') { //胜负
            dataList.list[i].canSelect = [1, -1, -1, -1]
          } else if (key=='31' || key == '32') { //让分胜负
            dataList.list[i].canSelect = [-1, 1, -1, -1]
          } else if (key=='41' || key == '42') { //大小分
            dataList.list[i].canSelect = [-1, -1, 1, -1]
          } else{   //胜分差
            dataList.list[i].canSelect = [-1, -1, -1, 1]
          } 
        }
      }

      if(selectNum == 0){
        dataList.list[i].canSelect = [0, 0, 0, 0];
      }

    }
  }

  // 查看详细数据
  goDetail(e, item) {
    var that = this;
    if (e.currentTarget.firstElementChild.className == "iconfont icon-down") {
      e.currentTarget.firstElementChild.className = "iconfont icon-up"

      this._menusService.getBassketballDetail().then(data => {
        this.basketballDetail = data;
        console.log(data)
      });

      item.expend = true;

    } else {
      e.currentTarget.firstElementChild.className = "iconfont icon-down"
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
    this.selectMatchDataList = [];
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

    if(tabid==2){
      this._menusService.getBassketballData3().then(data => {
        console.log(data)
        this.basketballList3 = data.resp;
        var sespmap = this.selectedSpMap(this.basketballList3.list[0].spMap);
        for (var i = 0; i < this.basketballList3.list.length; i++) {
          this.basketballList3.list[i].expend = false;
          this.basketballList3.list[i].SFC = [];
          this.basketballList3.list[i].selectSpMap = JSON.parse(JSON.stringify(sespmap));
          this.basketballList3.list[i].canSelect = [0, 0, 0, 0];
          this.basketballList3.list[i].selectedSpmapers = [];
        }
      })
    }
  }
  
  // 给每个竞彩选项设置选择的状态
  selectedSpMap(obj) {
    var arr = [];
    var newArr = [];
    for (var key in obj) {
      arr.push(key)
    }
    for (var i = 0; i < arr.length; i++) {
      newArr[arr[i]] = false;
    }
    // console.log(newArr)
    return newArr;
  }

  showTip(){
    // this.canSelectFun(this.footballList, index, item)
    console.log('showTip');
    var that = this
    that.showTips = true;
    window.setTimeout(function(){
      that.showTips = false;
    }, 2000);
    
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
    this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3);
      for(let i=0; i<this.selectMatchDataList.list.list.length; i++){
        var selectedSpmapersData = this.selectMatchDataList.list.list[i].selectedSpmapers;
        var SFC = []; //胜分差
        for(let j=0; j<selectedSpmapersData.length; j++){
          if(selectedSpmapersData[j].indexOf('-')>-1){
            SFC.push(selectedSpmapersData[j])
          }
        }
        this.selectMatchDataList.list.list[i].SFC = SFC;
      }
      this.basketballList3 = this.selectMatchDataList.list
  }

}
