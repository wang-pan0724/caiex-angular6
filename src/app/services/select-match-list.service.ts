import { Injectable } from '@angular/core';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class SelectMatchListService {

  public listData: any = [];
  public selectMatchNum: number = 0;
  public canGoNext: boolean = false;

  constructor() { }

  setData(dataList) {

    this.setMatchData(dataList);

    // TODO
    // this.canGoNextPage(dataList);

    var selectDataL = {
      list: dataList,
      selectMatchNum: this.selectMatchNum,
      canGoMext: this.canGoNext
    }
    return selectDataL;
  }

  // 记录已选比赛的信息
  setMatchData(dataList: any) {
    this.selectMatchNum = 0;
    for (var i = 0; i < dataList.list.length; i++) {
      if (this.matchIsSelect(dataList.list[i].selectSpMap)) {
        this.selectMatchNum++;
      }
      dataList.list[i].selectedList = this.getOneSelectSpMap(dataList.list[i].selectSpMap);
    }
  }

  // 查看每一场竞彩比赛是否被选
  matchIsSelect(obj): boolean {
    var selectArr = this.objToArr(obj);
    for (var j = 0; j < selectArr.length; j++) {
      if (selectArr[j] == true) {
        return true;
      }
    }
    return false;
  }

  // 对象转数组
  objToArr(obj) {
    var arr = []
    for (let i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }

  // 获取一个场次比赛的选项
  getOneSelectSpMap(obj): any {
    var str = [];
    str = this.findAllKey(obj, true);
    return str;
  }

  // 判断是否可以下一步跳转到提交订单页面
  canGoNextPage(e, item, str) {
    if (this.listData.length > 1) {
      this.canGoNext = true;
    } else {
      this.canGoNext = false;
    }
  }

  // 通过value找到key
  findAllKey(obj, value) {
    var arr = [];
    for (var key in obj) {
      if (obj[key] == value)
        arr.push(key)
    }
    return arr;
  }
}
