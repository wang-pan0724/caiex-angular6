import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changezhifubao',
  templateUrl: './changezhifubao.component.html',
  styleUrls: ['./changezhifubao.component.css']
})
export class ChangezhifubaoComponent implements OnInit {
  title = "添加支付宝账号";
  public haveText = true;
  constructor() { }

  ngOnInit() {
  }

}
