import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';

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
  constructor(private http: HttpClient,private signService: SignService,) { }

  ngOnInit() {

    this.getData()
  }

  getData(){
    let data = {
      'matchType':1,
      'gameId':407
    }

    this.http.get('/league/instantscore/zqscore/livezcmatchList.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      // this.doRegeisterData(response)
      console.log(response)
    });
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
