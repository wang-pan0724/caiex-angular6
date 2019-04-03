import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

  public menus = [];
  public data:any;
  constructor(private _menusService: MenusService,private ActivatedRoute: ActivatedRoute) { 
    this.data = this.ActivatedRoute.queryParams['_value']['data']
    // console.log(this.data);
    if(!!this.data){
      this.data = JSON.parse(this.data)
    }
  }
  ngOnInit() {
    this._menusService.getMenu().then(data => {
      this.menus = data;
    });
  }

  onScrollRefresh() {
    console.log("下拉刷新");
  }

  onSlideLeft() {
    console.log('向左边滑动啦...');
  }

  onSlideRight() {
    console.log('向右边滑动..');
  }

}
