import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  title = "比分直播-竞彩足球";
  itemData = ['精彩足球','北京单场','竞彩篮球'];
  tabIndex = 1;
  public _IsRefreshFinish = false;
  public IsNextPageFinish = false
  constructor() { }

  ngOnInit() {
  }

  handle(index){
      console.log(index)
      this.tabIndex = index;
  }

  onScrollRefresh() {
    // this.IsNextPageFinish = true
    console.log("下拉刷新");
    this._IsRefreshFinish = true;
    console.log( this._IsRefreshFinish)

    var that = this;
    window.setTimeout(function () {
      that._IsRefreshFinish = false;
    }, 1000);
    
  }

  onSlideLeft() {
    console.log('向左边滑动啦...');
  }

  onSlideRight() {
    console.log('向右边滑动..');
  }

}
