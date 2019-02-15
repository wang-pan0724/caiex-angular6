import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectMatchListService {
  
  public listData: any = [];
  public selectMatchNum: number = 0;
  public canGoNext: boolean = false;

  constructor() { }

  setData(e, item, str) {
    
    this.setMatchData(e, item, str);

    // TODO
    this.canGoNextPage(e, item, str);

    var selectDataL = {
      list:this.listData,
      selectMatchNum:this.listData.length,
      canGoMext:this.canGoNext
    }
   
    this.setStyle(e);

    return selectDataL;
  }

   // 设置选择比赛的样式
  setStyle(e) {
    var isChecked = e.currentTarget.firstElementChild.checked;

    if (!isChecked) {
      e.currentTarget.firstElementChild.checked = true;
      e.currentTarget.className = 'scoreSelect';
    } else {
      e.currentTarget.firstElementChild.checked = false;
      e.currentTarget.className = '';
    }
  }

  // 记录已选比赛的信息
  setMatchData(e, item:any, str) {
    var isChecked = e.currentTarget.firstElementChild.checked;

    if(isChecked){ //去掉已选择的竞彩选项
      var spmap = this.getSelectSpMap(item);
      // 本场次比赛有多项竞彩选项
      if(spmap.split(',').length>1){
        for(var i=0; i<this.listData.length; i++){
          if(this.listData[i].matchNo == item.matchNo){
           this.listData[i].selectSpMap = this.processStr(spmap,str);
          }
        }
      }else{// 本场次比赛有一项竞彩选项
        for(var i=0; i<this.listData.length; i++){
          if(this.listData[i].matchNo == item.matchNo){
           this.listData.splice(i,1);
          }
        }
      }
    }
    else if(!isChecked && !this.hasSetList(item)){ //选择竞彩选项（本场次没被选过）
      item.selectSpMap = str;
      this.listData.push(item);
    }
    else if(!isChecked && this.hasSetList(item)){ //选择竞彩选项（本场次已被选过）
      var selectSpMaps = [];
      for(var i=0; i<this.listData.length; i++){
        if(this.listData[i].matchNo == item.matchNo){
          selectSpMaps = this.listData[i].selectSpMap;
          this.listData[i].selectSpMap = selectSpMaps+ ',' + str;
        }
      }
    }
    
    console.log(this.listData)
  }

  // 判断listData是否已经加入本场比赛
  hasSetList(item){
    for(var i=0; i<this.listData.length; i++){
      if(this.listData[i].matchNo == item.matchNo){
        return true;
      }
    }
    return false;
  }

  // 获取一场次比赛的竞猜选项
  getSelectSpMap(item):string {
    var str = "";
    for(var i=0; i<this.listData.length; i++){
      if(this.listData[i].matchNo == item.matchNo){
        str = this.listData[i].selectSpMap;
      }
    }
    return str;
  }

  // 处理selectSpMap
  processStr(spmap,str){
    var newSpmap=""
    var arr = spmap.split(',');
    var index = arr.indexOf(str);
    arr.splice(index,1);

    for(var i=0; i<arr.length; i++){
      newSpmap += arr[i];
      if(i!=arr.length-1){
        newSpmap += ',';
      }
    }

    return newSpmap;
  }

  // 判断是否可以下一步跳转到提交订单页面
  canGoNextPage(e, item, str){
    if(this.listData.length>1){
      this.canGoNext = true;
    }else{
      this.canGoNext = false;
    }
  }
}
