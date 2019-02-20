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
    this.canGoNextPage(dataList);

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

      var list = this.findAllKey(dataList.list[i].selectSpMap, true);
      dataList.list[i].selectedList = list;

      var spmapersList = [];
      for (var j = 0; j < list.length; j++) {
        var arrItem = this.findKey(dataList.spmapers, list[j]);
        var concede = dataList.list[i].concede;
        var newArrItem = "";
        // 处理rq_平，rq_胜，rq_负 字段
        if (arrItem == "rq_平" || arrItem == "rq_胜" || arrItem == "rq_负") {
          var newConcede = concede > 0 ? "+" + concede : concede;
          newArrItem = newConcede + arrItem.split('_')[1]
        } else {
          newArrItem = arrItem;
        }
        spmapersList.push(newArrItem);
      }
      dataList.list[i].selectedSpmapers = spmapersList;
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
  getOneSelectSpMap(obj, str): any {
    var arr = [];
    arr = this.findAllKey(obj, str);
    return arr;
  }

  // 判断是否可以下一步跳转到提交订单页面
  canGoNextPage(dataList) {
    console.log("canGoNextPage..............");
    console.log(dataList)
    if (this.selectMatchNum > 1) {
      this.canGoNext = true;
    } else {
      if (dataList.gameId == 4077) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            if (arr.indexOf("spf_0") > -1 || arr.indexOf("spf_1") > -1 || arr.indexOf("spf_3") > -1) {
              if (arr.indexOf("rqspf_0") > -1 || arr.indexOf("rqspf_1") > -1 || arr.indexOf("rqspf_3") > -1) {
                canGo = false;
              } else {
                canGo = true;
              }
            }
          }
        }
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4075) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            if (arr.indexOf("rqspf_0") > -1 || arr.indexOf("rqspf_1") > -1 || arr.indexOf("rqspf_3") > -1) {
              canGo = false;
            } else {
              canGo = true;
            }
          } else if(arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4076') == -1) {
            if (arr.indexOf("rqspf_0") > -1 || arr.indexOf("rqspf_1") > -1 || arr.indexOf("rqspf_3") > -1 || arr.indexOf("spf_0") > -1 || arr.indexOf("spf_1") > -1 || arr.indexOf("spf_3") > -1) {
              canGo = false;
            } else {
              canGo = true;
            }
          }
        }
        this.canGoNext = canGo;
      }else{
        this.canGoNext = true;
      }
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

  findKey(obj, value) {
    var str = "";
    for (var key in obj) {
      if (obj[key] == value)
        str = key;
    }
    return str;
  }
}
