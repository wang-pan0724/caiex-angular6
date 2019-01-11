import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {

  public navId: number = 0;
  public tabId: number = 0;
  public navData = [
    {
      id:0,
      name:'胜负'
    },
    {
      id:1,
      name:'让分胜负'
    },
    {
      id:2,
      name:'混合过关'
    },
    {
      id:3,
      name:'大小分'
    },
    {
      id:4,
      name:'胜分差'
    },
  ];
  
  constructor() { }

  ngOnInit() {
  }

  // nav切换
  navChanged(navid){
    this.navId = navid;
    console.log('全部/单关'+navid);
  }

  // tab切换
  tabChanged(tabid){
    this.tabId = tabid;
  }

}
