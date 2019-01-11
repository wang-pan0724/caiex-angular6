import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() onNavChanged = new EventEmitter();
  @Output() onTabChanged = new EventEmitter();

  public switchIndex: string = '0';
  public switchNavIndex: string = '0';
  constructor() { }

  ngOnInit() {
  }

   // 切换nav 向父组件传值   全部/单关
   switchNav(navIndex){
    this.switchNavIndex = navIndex;
    this.onNavChanged.emit(navIndex);
  }

  // 切换tab
  switchTab(index) {
    this.switchIndex = index;
    this.onTabChanged.emit(index);
    // localStorage.setItem('SWITCH_INDEX', this.switchIndex);
  }
  
  // 返回上一页
  goBack() {
    history.go(-1);
  }

}
