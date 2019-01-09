import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {

  public switchIndex: string = '0';
  public switchNavIndex: string = '0';

  constructor() { }

  ngOnInit() {
  }


  goBack() {
    history.go(-1);
  }

  // 切换nav   全部/单关
  switchNav(navIndex){
    this.switchNavIndex = navIndex;
  }

  // 切换tab
  switchTab(index: string): void {
    this.switchIndex = index;
    // localStorage.setItem('SWITCH_INDEX', this.switchIndex);
  }


}
