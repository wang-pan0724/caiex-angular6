import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "首页";
  public myArr = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H']];

  constructor(public storage: LoginService) { }

  ngOnInit() {
    this.storage.getData();
    var str = this.getGroup(this.data);
    console.log(str);
  }

  public data = ['0', '1', '2', '3'];
  getGroup(data, index = 0, group = []) {
    var need_apply = new Array();
    need_apply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
      need_apply.push(group[i] + "," + data[index]);
    }
    group.push.apply(group, need_apply);

    if (index + 1 >= data.length) return group;
    else return this.getGroup(data, index + 1, group);
  }

  doExchange(arr) {
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
      return this.doExchange(newArr);
    } else {
      return arr[0];
    }
  }
}
