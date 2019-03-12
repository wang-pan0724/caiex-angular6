import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent implements OnInit {

  public title: string = "确认订单";
  public multiples: any = 1;
  public firmOrder: any = [];
  public minBonus: string = '0';
  public maxBonus: string = '0';
  public listZhu: number = 0;
  public showDanTips: boolean = false;
  public showDanStr: string = "";
  public guanType: any = [
    {
      id: 1,
      title: "单关",
      type: '0',
      select: false
    },
    {
      id: 2,
      title: "2串1",
      type: '1',
      select: false
    },
    {
      id: 3,
      title: "3串1",
      type: '0',
      select: false
    },
    {
      id: 4,
      title: "4串1",
      type: '0',
      select: false
    },
    {
      id: 5,
      title: "5串1",
      type: '0',
      select: false
    },
    {
      id: 6,
      title: "6串1",
      type: '0',
      select: false
    },
    {
      id: 7,
      title: "7串1",
      type: '0',
      select: false
    },
    {
      id: 8,
      title: "8串1",
      type: '0',
      select: false
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    // 获取用户所选的竞彩比赛
    // console.profile()
    this.firmOrder = JSON.parse(localStorage.getItem('firmOrder'));
    // console.log( this.sortGroup(this.data))
    this.initDan();
    this.initGuan();

    this.getPrize();
    // console.profileEnd()
  }

  showTips() {
    var num = 0;
    for (var i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].select == true) {
        num++
      }
    }
    if (num == 0) {
      this.showDanStr = "请选择过关方式"
    } else {
      this.showDanStr = "当前过关方式已达最大设胆数量"
    }
    var that = this
    that.showDanTips = true;
    window.setTimeout(function () {
      that.showDanTips = false;
      that.showDanStr = ""
    }, 2000);
  }

  getPrize() {
    var selectSpmaps = [];
    var bonusArrAll = [];
    var bonusArrMax = [];
    var data = []
    var index = 0;
    var danindex = 0;
    var danArr = [];
    var dan = [];
    for (var i = 0; i < this.firmOrder.list.list.length; i++) {
      var listData = this.firmOrder.list.list[i]
      if (listData.selectDan == true && listData.canSelectDan && listData.selectedSpmapers.length > 0) {
        danArr[danindex] = this.firmOrder.list.list[i].selectedSpmapers;
        dan.push('dan_' + danindex);
        danindex++;
      }
      if (listData.selectDan == false && listData.selectedSpmapers.length > 0) {
        selectSpmaps[index] = listData.selectedSpmapers;
        data.push(index);
        index++;
      }
    }

    if (data.length == 1 && dan.length == 0) {
      // 预计奖金 
      this.minBonus = (this.multiples * 0).toFixed(2);
      var max = Number(selectSpmaps[0][0].split(' ')[1])
      for (var i = 0; i < selectSpmaps[0].length; i++) {
        if (Number(selectSpmaps[0][i].split(' ')[1]) > max) {
          max = Number(selectSpmaps[0][i].split(' ')[1])
        }
      }
      this.maxBonus = (2 * this.multiples * max).toFixed(2)

      // 计算注数
      this.listZhu = 1;
    } else {
      var sortGroupData = [];
      if (dan.length > 0) {
        var sortData = this.sortGroup(data);
        for (var i = 0; i < sortData.length; i++) {
          sortData[i] = sortData[i] + ',' + dan;
        }
        sortGroupData = sortData;
      } else {
        sortGroupData = this.sortGroup(data);
      }

      // console.log("比赛排序。。。。。");
      // console.log(sortGroupData);

      var guanTypeSelectArr = [];
      for (var i = 0; i < this.guanType.length; i++) {
        if (this.guanType[i].select == true) {
          guanTypeSelectArr.push(i + 1)
        }
      }

      for (var i = 0; i < guanTypeSelectArr.length; i++) {
        var arr = [];
        for (var j = 0; j < sortGroupData.length; j++) {
          if (typeof (sortGroupData[j]) == "string" && sortGroupData[j].split(',').length == guanTypeSelectArr[i]) {
            arr.push(sortGroupData[j]);
          }
        }

        for (var j = 0; j < arr.length; j++) {
          var groupArr = arr[j].split(',');
          var newArr = [];
          for (var k = 0; k < groupArr.length; k++) {
            if (groupArr[k].indexOf('dan_') > -1) {
              newArr[k] = danArr[groupArr[k].split('_')[1]]
            } else {
              newArr[k] = selectSpmaps[groupArr[k]];
            }
          }

          console.log(this.hunhePrize(newArr));
          var getMinAndMaxArr = this.calculatedBonus(this.hunhePrize(newArr))
          bonusArrAll = bonusArrAll.concat(getMinAndMaxArr[0]);//奖金数组
          bonusArrMax = bonusArrMax.concat(getMinAndMaxArr[1])
        }
      }

      // 预计奖金 
      var minprice = !!this.getMinAndMax(bonusArrAll)[0] ? this.getMinAndMax(bonusArrAll)[0] : '0'
      this.minBonus = (this.multiples * minprice).toFixed(2);
      this.maxBonus = (this.multiples * this.getMinAndMax(bonusArrMax)[1]).toFixed(2)

      // 计算注数
      this.listZhu = bonusArrAll.length;
      console.log(minprice)
      console.log(this.getMinAndMax(bonusArrMax)[1])
    }

  }

  getMinAndMax(bonusArr) {
    var min = bonusArr[0];
    var max = 0;
    for (var i = 0; i < bonusArr.length; i++) {
      max += bonusArr[i];
      if (bonusArr[i] < min) {
        min = bonusArr[i];
      }
    }

    return [min, max];
  }

  // 计算奖金
  calculatedBonus(arr) {
    var prize = [];
    for (var i = 0; i < arr.length; i++) {
      var bonus = 2;
      for (var j = 0; j < arr[i].length; j++) {
        bonus = bonus * arr[i][j].split(' ')[1];
      }
      prize.push(bonus);
    }

    var maxPrize = prize[0]
    for (var i = 0; i < prize.length; i++) {
      if (prize[i] > maxPrize) {
        maxPrize = prize[i];
      }
    }
    return [prize, maxPrize];
  }

  // 删除所选的竞彩比赛
  deleteThisItem(matchNo, matchTime) {
    // 如果所选的比赛大于两场
    if (this.firmOrder.selectMatchNum > 2) {

      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
          this.firmOrder.list.list.splice(i, 1);
          this.firmOrder.selectMatchNum--;
          this.initGuan();
        }
      }

    } else if (this.firmOrder.selectMatchNum == 2) {
      // TODO
      if (this.firmOrder.list.gameId == 4077 || this.firmOrder.list.gameId == 4075) { // 胜平负
        var betSinglePlaytypeNum = 0;
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            if (this.firmOrder.list.list[i].selectedList.length > 0 && this.firmOrder.list.list[i].selectedList.indexOf("rqspf_") == -1) {
              betSinglePlaytypeNum++;
            }
          } else {
            if (this.firmOrder.list.list[i].selectedList.length > 0 && this.firmOrder.list.list[i].selectedList.indexOf("spf_0") == -1 && this.firmOrder.list.list[i].selectedList.indexOf("rqspf_0") == -1) {
              betSinglePlaytypeNum++;
            }
          }
        }

        if (betSinglePlaytypeNum == 0) {
          this.showDanStr = "至少选择两场比赛"
          var that = this
          that.showDanTips = true;
          window.setTimeout(function () {
            that.showDanTips = false;
            that.showDanStr = ""
          }, 2000);
        } else if (betSinglePlaytypeNum == 1) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            var listData = this.firmOrder.list.list[i]
            if (listData.betSinglePlaytype.indexOf('4076') > -1 && listData.matchNo == matchNo && listData.matchTime == matchTime) {
              this.showDanStr = "至少选择两场比赛"
              var that = this
              that.showDanTips = true;
              window.setTimeout(function () {
                that.showDanTips = false;
                that.showDanStr = ""
              }, 2000);
            } else if (listData.matchNo == matchNo && listData.matchTime == matchTime) {
              this.firmOrder.list.list.splice(i, 1);
              this.firmOrder.selectMatchNum--;
              this.initGuan();
            }
          }
        } else if (betSinglePlaytypeNum == 2) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            if (this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
              this.firmOrder.list.list.splice(i, 1);
              this.firmOrder.selectMatchNum--;
              this.initGuan();
            }
          }
        }

      } else { //比分 总进球 半全场
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          if (this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
            this.firmOrder.list.list.splice(i, 1);
            this.firmOrder.selectMatchNum--;
            this.initGuan();
          }
        }
      }
    } else {
      this.showDanStr = "至少选择一场比赛";
      var that = this;
      that.showDanTips = true;
      window.setTimeout(function () {
        that.showDanTips = false;
        that.showDanStr = ""
      }, 2000);
    }

    this.changeGuan();
  }

  // 初始化每场比赛的胆
  initDan() {
    var guanTypeNum = 0;
    var selectGuanType = [];
    for (var i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].select == true && this.guanType[i].type == 1) {
        guanTypeNum++;
        selectGuanType.push(i);
      }
    }

    if (this.guanType[this.firmOrder.selectMatchNum - 1].select == true || this.guanType[0].select == true) {
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        this.firmOrder.list.list[i].selectDan = false;
        this.firmOrder.list.list[i].canSelectDan = false;
      }
    } else {
      if (guanTypeNum == 0) {
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          this.firmOrder.list.list[i].selectDan = false;
          this.firmOrder.list.list[i].canSelectDan = false;
        }
      } else {
        var selectDanNum = 0;
        for (var k = 0; k < this.firmOrder.list.list.length; k++) {
          if (this.firmOrder.list.list[k].selectDan == true) {
            selectDanNum++;
          }
        }

        if (selectGuanType[0] > selectDanNum) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            this.firmOrder.list.list[i].canSelectDan = true;
          }
        } else {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            if (this.firmOrder.list.list[i].selectDan == false) {
              this.firmOrder.list.list[i].canSelectDan = false;
            }
          }
        }

      }
    }
    this.getPrize();
    // console.log('设胆。。。。。')
    // console.log(this.firmOrder.list)
  }

  // 设置过关方式
  initGuan() {
    for (var i = 0; i < this.guanType.length; i++) {
      this.guanType[i].type = 0;
      this.guanType[i].select = false;
    }

    var betSinglePlaytypeNum = 0;
    if (this.firmOrder.list.gameId == 4077) { //足球胜平负
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1 && this.firmOrder.list.list[i].selectedList.length > 0) {
          betSinglePlaytypeNum++;
        }
        // if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1) {
        //   if (this.firmOrder.list.list[i].selectedList.length>0 && this.firmOrder.list.list[i].selectedList.indexOf("spf_") > -1) {
        //     betSinglePlaytypeNum++;
        //   }
        // }
      }
    } else if (this.firmOrder.list.gameId == 4075) { //足球混合过关
      // TODO
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1) {
          if (this.firmOrder.list.list[i].selectedList.length > 0 && this.firmOrder.list.list[i].selectedList.indexOf("rqspf_") == -1) {
            betSinglePlaytypeNum++;
          }
        } else {
          if (this.firmOrder.list.list[i].selectedList.length > 0 && this.firmOrder.list.list[i].selectedList.indexOf("spf_") == -1 && this.firmOrder.list.list[i].selectedList.indexOf("rqspf_") == -1) {
            betSinglePlaytypeNum++;
          }
        }
      }
    } else if (this.firmOrder.list.gameId == 4061) { //篮球胜负
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4061') > -1 && this.firmOrder.list.list[i].selectedList.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    } else { //比分 总进球 半全场
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].selectedList.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    }

    if (betSinglePlaytypeNum == this.firmOrder.selectMatchNum) {
      this.guanType[0].type = 1;
    }

    for (var i = 1; i < this.firmOrder.selectMatchNum; i++) {
      this.guanType[i].type = 1
    }

    this.guanType[this.firmOrder.selectMatchNum - 1].select = true;
  }

  // 做胆
  setDan() {
    this.initDan()
  }

  // 选择过关方式
  changeGuan() {
    for (var i = 0; i < this.firmOrder.list.list.length; i++) {
      this.firmOrder.list.list[i].canSelectDan = true;
      this.firmOrder.list.list[i].selectDan = false;
    }

    this.initDan();
    this.getPrize();
  }

  // 选择倍数（输入倍数）
  changeMuitples(e) {
    this.multiples = this.multiples.replace(/[^\d]/g, '');
    this.getPrize();
  }

  // 选择倍数（点击按钮减少倍数）
  sub() {
    if (this.multiples == 0) {
      this.showDanStr = "最小倍数为1倍"
      var that = this;
      that.showDanTips = true;
      window.setTimeout(function () {
        that.showDanTips = false;
        that.showDanStr = "";
      }, 2000);
    }
    if (this.multiples > 1) {
      this.multiples--;
    } else {
      this.multiples = 0;
    }

    this.getPrize();
  }

  // 选择倍数（点击按钮增加倍数）
  add() {
    if (this.multiples < 10000) {
      this.multiples++;
    } else {
      this.showDanStr = "最大倍数为10000倍"
      var that = this;
      that.showDanTips = true;
      window.setTimeout(function () {
        that.showDanTips = false;
        that.showDanStr = "";
      }, 2000);
    }

    this.getPrize();
  }


  sortGroup(data, index = 0, group = []) {
    var needApply = new Array();
    needApply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
      needApply.push(group[i] + "," + data[index]);
    }
    // group.push.apply(group, need_apply);
    group = group.concat(needApply);
    if (index + 1 >= data.length) {
      return group;
    }
    else {
      return this.sortGroup(data, index + 1, group)
    };
  }


  hunhePrize(arr) {
    var len = arr.length;
    if (len >= 2) {
      var len1 = arr[0].length;
      var len2 = arr[1].length;
      var lenBoth = len1 * len2;
      var items = new Array(lenBoth);
      var index = 0;
      for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
          if (arr[0][i] instanceof Array) {
            items[index] = arr[0][i].concat(arr[1][j]);
          } else {
            items[index] = [arr[0][i]].concat(arr[1][j]);
          }
          index++;
        }
      }
      var newArr = new Array(len - 1);
      for (var i = 2; i < arr.length; i++) {
        newArr[i - 1] = arr[i];
      }
      newArr[0] = items;
      return this.hunhePrize(newArr);
    } else {
      return arr[0];
    }
  }

}
