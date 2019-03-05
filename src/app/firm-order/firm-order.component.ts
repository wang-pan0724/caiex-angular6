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
    console.profileEnd()
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
      if(this.firmOrder.list.list[i].selectDan == true && this.firmOrder.list.list[i].canSelectDan && this.firmOrder.list.list[i].selectedSpmapers.length > 0){
        danArr[danindex] = this.firmOrder.list.list[i].selectedSpmapers;
        dan.push('dan_'+danindex);
        danindex++;
      }
      if (this.firmOrder.list.list[i].selectDan == false && this.firmOrder.list.list[i].selectedSpmapers.length > 0) {
        selectSpmaps[index] = this.firmOrder.list.list[i].selectedSpmapers;
        data.push(index);
        index++;
      }
    }

    if (data.length == 1 && dan.length == 0) {
      // 预计奖金 
      this.minBonus = (this.multiples * 0).toFixed(2);
      var max = Number(selectSpmaps[0][0].split(' ')[1])
      for(var i=0; i<selectSpmaps[0].length; i++){
        if(Number(selectSpmaps[0][i].split(' ')[1])>max){
          max = Number(selectSpmaps[0][i].split(' ')[1])
        }
      }
      this.maxBonus = (2*this.multiples * max).toFixed(2)

      // 计算注数
      this.listZhu = 1;
    } else{
      var sortGroupData = [];
      if(dan.length>0){
        var sortData = this.sortGroup(data);
        for(var i=0; i<sortData.length; i++){
          sortData[i] = sortData[i]+','+dan;
        }
        sortGroupData = sortData;
      }else{
        sortGroupData = this.sortGroup(data);
      }
      
      console.log("比赛排序。。。。。");
      console.log(sortGroupData);

      var guanTypeSelectArr = [];
      for (var i = 0; i < this.guanType.length; i++) {
        if (this.guanType[i].select == true) {
          guanTypeSelectArr.push(i + 1)
        }
      }

      // console.log("选择的过关方式");
      // console.log(guanTypeSelectArr);

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
            if(groupArr[k].indexOf('dan_')>-1){
              newArr[k] = danArr[groupArr[k].split('_')[1]]
            }else{
              newArr[k] = selectSpmaps[groupArr[k]];
            }
          }
         
          console.log(this.hunhePrize(newArr));
          var getMinAndMaxArr = this.calculatedBonus(this.hunhePrize(newArr))
          bonusArrAll = bonusArrAll.concat(getMinAndMaxArr[0]);
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
      if (this.firmOrder.list.gameId == 4077 || this.firmOrder.list.gameId == 4075) { // 胜平负
        var betSinglePlaytypeNum = 0;
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            betSinglePlaytypeNum++;
          }
        }

        if (betSinglePlaytypeNum == 0) {
          alert('至少选择两场比赛');
        } else if (betSinglePlaytypeNum == 1) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1 && this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
              alert('至少选择两场比赛');
            } else if (this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
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
      alert('至少选择一场比赛');
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
    console.log('设胆。。。。。')
    console.log(this.firmOrder.list)
  }

  // 设置过关方式
  initGuan() {
    for (var i = 0; i < this.guanType.length; i++) {
      this.guanType[i].type = 0;
      this.guanType[i].select = false;
    }

    var betSinglePlaytypeNum = 0;
    if (this.firmOrder.list.gameId == 4077 || this.firmOrder.list.gameId == 4075) { //胜平负 混合过关
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1 && this.firmOrder.list.list[i].selectedList.length > 0) {
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
    this.getPrize()
  }

  // 选择倍数（输入倍数）
  changeMuitples(e) {
    this.multiples = this.multiples.replace(/[^\d]/g, '');
    this.getPrize()
  }

  // 选择倍数（点击按钮减少倍数）
  sub() {
    if (this.multiples == 0) {
      alert("最小倍数为1倍");
    }
    if (this.multiples > 1) {
      this.multiples--;
    } else {
      this.multiples = 0
    }

    this.getPrize()
  }

  // 选择倍数（点击按钮增加倍数）
  add() {
    if (this.multiples < 10000) {
      this.multiples++;
    } else {
      alert("最大倍数为10000倍")
    }

    this.getPrize()
  }

  sortGroup(data, index = 0, group = []) {
    var need_apply = new Array();
    need_apply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
      need_apply.push(group[i] + "," + data[index]);
    }
    group.push.apply(group, need_apply);

    if (index + 1 >= data.length) return group;
    else return this.sortGroup(data, index + 1, group);
  }

  hunhePrize(arr) {
    var len = arr.length;
    // 当数组大于等于2个的时候
    if (len >= 2) {
      // 第一个数组的长度
      var len1 = arr[0].length;
      // 第二个数组的长度
      var len2 = arr[1].length;
      // 2个数组产生的组合数
      var lenBoth = len1 * len2;
      //  申明一个新数组
      var items = new Array(lenBoth);
      // 申明新数组的索引
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
