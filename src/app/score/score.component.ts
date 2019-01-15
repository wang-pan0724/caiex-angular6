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
  constructor() { }

  ngOnInit() {
  }

  handle(index){
      console.log(index)
      this.tabIndex = index;
  }

}
