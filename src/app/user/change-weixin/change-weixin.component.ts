import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-weixin',
  templateUrl: './change-weixin.component.html',
  styleUrls: ['./change-weixin.component.css']
})
export class ChangeWeixinComponent implements OnInit {
  title = "添加微信账号";
  public haveText = true;
  constructor() { }

  ngOnInit() {
  }

}
